export const setNeoline = (state, neoline) => {
  state.neoline.neolineN3 = neoline
}

export const setConnectedAddress = (state, address) => {
  state.neoline.connectedAddress = address
}

export const setNotification = (state, payload) => {
  state.neoline.notification = payload
}

export const setOwnedNFTs = (state, payload) => {
  state.neoline.ownedNFTs = payload
}

export const setLoadingNFTProperties = (state, isLoading) => {
  state.neoline.loadingNFTProperties = isLoading
}
