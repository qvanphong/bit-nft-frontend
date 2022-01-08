<template>
  <div class="relative flex flex-col items-center justify-start min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    <span v-if="!isWalletConnected">Please connect your wallet</span>
    <div
      v-else
      class=" max-w-screen-xl"
    >
      <div v-if="isLoadingNFTProperties">
        <vs-button disabled>
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg> Loading
        </vs-button>
      </div>
      <div
        v-else
        class="grid grid-cols-4 gap-4"
      >
        <vs-card v-for="ownedNFT in ownedNFTs" :key="ownedNFT.name">
          <template #title>
            <h3>{{ ownedNFT.name }}</h3>
          </template>
          <template #img>
            <img
              :src="ownedNFT.image"
              alt=""
            >
          </template>
          <template #text>
            <p>
              {{ ownedNFT.description }}
            </p>
          </template>
          <template #interactions>
            <vs-button
              danger
              @click="burnNFT"
            >
              Burn for nothing.
            </vs-button>
          </template>
        </vs-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isWalletConnected () {
      return this.$store.getters.isWalletConnected
    },
    ownedNFTs () {
      return this.$store.getters.getOwnedNFTs
    },
    isLoadingOwnedNFTs () {
      return this.$store.getters.isLoadingNFTProperties
    }
  },
  watch: {
    isWalletConnected (newVal) {
      if (newVal === true) {
        this.getTokensOfWallet()
      }
    }
  },
  created () {
    if (this.isWalletConnected) {
      this.getTokensOfWallet()
    }
  },
  methods: {
    getTokensOfWallet () {
      this.$neolineService.getOwnedNFT()
    },
    burnNFT () {
      this.$vs.notification({
        color: "danger",
        title: "Oops",
        text: "I'm too lazy to working on this ¯\\_(ツ)_/¯"
      })
    }
  }
}
</script>

<style>
</style>
