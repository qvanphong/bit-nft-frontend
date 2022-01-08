export default class NeolineService {
  constructor (store) {
    this.store = store
    this.neolineN3 = store.state.neoline.neolineN3
    this.contractAddress = "Ndo2uMVB1gw8buCczbqtTTW8fANakhS6vB"
    this.contractScriptHash = "c725dbf0593de8287d701589c7ef4375917422c4" // it's big-endian script hash
  }

  getAccount () {
    const neolineN3 = this.store.state.neoline.neolineN3

    neolineN3
      .getAccount()
      .then((account) => {
        const { address } = account
        this.store.commit("setConnectedAddress", address)
      })
      .catch(this._commitErrorNotification)
  }

  sendGasToContractAddress () {
    const neolineN3 = this.store.state.neoline.neolineN3

    neolineN3
      .send({
        fromAddress: this.store.state.neoline.connectedAddress,
        toAddress: this.contractAddress,
        asset: "GAS",
        amount: "2"
      })
      .then((result) => {
        this.store.commit("setNotification", {
          type: "success",
          message: `Broadcasted transaction, TXID: ${result.txid}`
        })
      })
      .catch(this._commitErrorNotification)
  }

  async getOwnedNFT () {
    this.store.commit("setOwnedNFTs", [])
    this.store.commit("setLoadingNFTProperties", true)

    const ownedTokenIds = await this.getTokenIdsOfAddress()
    if (ownedTokenIds == null) {
      this.store.commit("setLoadingNFTProperties", true)
      return
    }

    const ownedNFTs = []
    for (const ownedTokenId of ownedTokenIds) {
      const tokenProperties = await this.getTokenProperties(ownedTokenId)
      ownedNFTs.push(tokenProperties)
    }

    this.store.commit("setOwnedNFTs", ownedNFTs)
    this.store.commit("setLoadingNFTProperties", false)
  }

  async getAddressScriptHash () {
    if (this.addressScriptHash) {
      return this.addressScriptHash
    }

    const neolineN3 = this.store.state.neoline.neolineN3
    const addressScriptHash = await neolineN3
      .AddressToScriptHash({
        address: this.store.state.neoline.connectedAddress
      })
      .catch((err) => {
        this._commitErrorNotification(err)
        return null
      })

    const { scriptHash } = addressScriptHash
    this.addressScriptHash = scriptHash
    return scriptHash
  }

  async getTokenIdsOfAddress () {
    const neolineN3 = this.store.state.neoline.neolineN3

    // convert address to script hash first.
    const scriptHash = await this.getAddressScriptHash()
    if (scriptHash == null) {
      return null
    }

    // begin invoke tokensOf.
    const innovationResult = await neolineN3
      .invokeRead({
        scriptHash: this.contractScriptHash,
        operation: "tokensOf",
        args: [
          {
            type: "Hash160",
            value: scriptHash
          }
        ],

        signers: [
          {
            account: scriptHash,
            scopes: 1
          }
        ]
      })
      .catch((err) => {
        this._commitErrorNotification(err)
        return null
      })

    if (!innovationResult || innovationResult.state === "FAULT") {
      return null
    }

    if (innovationResult.stack && innovationResult.stack.length > 0) {
      return innovationResult.stack[0].iterator.map(token => token.value)
    }
    return []
  }

  async getTokenProperties (tokenId) {
    const scriptHash = await this.getAddressScriptHash()
    if (scriptHash == null) {
      return null
    }
    const neolineN3 = this.store.state.neoline.neolineN3

    const innovationResult = await neolineN3.invokeRead({
      scriptHash: this.contractScriptHash,
      operation: "properties",
      args: [
        {
          type: "ByteArray",
          value: tokenId
        }
      ],

      signers: [
        {
          account: scriptHash,
          scopes: 1
        }
      ]
    })

    if (innovationResult == null && innovationResult.result === "FAULT") { return null }
    const propertiesIterator = innovationResult.stack[0].value
    const tokenProperties = {}
    propertiesIterator.forEach((tokenProperty) => {
      const objectPropertyName = Buffer.from(tokenProperty.key.value, "base64").toString("ascii")
      const objectPropertyValue = Buffer.from(tokenProperty.value.value, "base64").toString("ascii")
      tokenProperties[objectPropertyName] = objectPropertyValue
    })

    return tokenProperties
    // stack: Array(1)
    // 0:
    // type: "Map"
    // value: Array(4)
    // 0:
    // key: {type: 'ByteString', value: 'bmFtZQ=='}
    // value: {type: 'ByteString', value: 'QklUICMx'}
    // [[Prototype]]: Object
    // 1: {key: {…}, value: {…}}
    // 2: {key: {…}, value: {…}}
    // 3: {key: {…}, value: {…}}
  }

  _commitErrorNotification (error) {
    const { description } = error
    this.store.commit("setNotification", {
      type: "error",
      message: description
    })
  }
}
