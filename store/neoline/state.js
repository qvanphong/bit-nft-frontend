export default () => ({
  // Neoline instance for use globally.
  neolineN3: null,

  // Connected N3 Address.
  connectedAddress: null,

  // notification to show notification in UI.
  // structure:
  // {
  // type: " success || error",
  // message: "string"
  // }
  notification: null,

  ownedNFTs: [],
  loadingNFTProperties: true
})
