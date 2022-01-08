export const isWalletConnected = (state) => {
  return state.neoline.connectedAddress != null
}

export const getOwnedNFTs = (state) => {
  return state.neoline.ownedNFTs
}

export const isLoadingNFTProperties = (state) => {
  return state.neoline.loadingNFTProperties
}
