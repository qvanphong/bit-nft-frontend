<template>
  <vs-button @click="getBalance">
    {{ label }}
  </vs-button>
</template>

<script>
export default {
  computed: {
    label () {
      return this.$store.state.neoline.connectedAddress || "Connect Neoline Wallet"
    }
  },
  methods: {
    getBalance () {
      this.$neolineService.getAccount()
    }
  }
}
</script>

<style>
</style>
