import * as mutations from "./neoline/mutations"
import * as getters from "./neoline/getters"
import state from "./neoline/state"

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
