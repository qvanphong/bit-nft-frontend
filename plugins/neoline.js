/* eslint-disable no-undef */

import NeolineService from "~/services/neoline_service"

// import Vue from "vue"
export default function ({ $axios, store }, inject) {
  window.addEventListener("NEOLine.N3.EVENT.READY", () => {
    const neolineN3 = new NEOLineN3.Init()
    store.commit("setNeoline", neolineN3)
  })
  const neolineService = new NeolineService(store)
  inject("neolineService", neolineService)
}
