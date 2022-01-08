<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <vs-navbar
      center-collapsed
    >
      <template #left>
        <img
          src="@/assets/homelogo.png"
          alt=""
          width="32"
        >
      </template>
      <vs-navbar-item id="home" to="/">
        Home
      </vs-navbar-item>
      <vs-navbar-item id="myNFT" to="/mynft">
        My NFTs
      </vs-navbar-item>
      <template #right>
        <connect-wallet-button />
      </template>
    </vs-navbar>
    <Nuxt style="padding-top: 6rem !important" />
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */

import ConnectWalletButton from "~/components/ConnectWalletButton.vue"

export default {
  components: { ConnectWalletButton },
  head () {
    return {
      title: "BIT NFT"
    }
  },
  computed: {
    notification () {
      return this.$store.state.neoline.notification
    }
  },

  watch: {
    notification (newVal) {
      if (newVal != null) {
        this.$vs.notification({
          duration: 7000,
          color: (newVal.type === "error") ? "danger" : "success",
          title: newVal.type.toUpperCase(),
          text: newVal.message
        })
      }
    }
  }
}
</script>

<style>
</style>
