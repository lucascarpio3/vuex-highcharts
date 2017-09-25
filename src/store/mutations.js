import {
  DEFAULT,
  SET_MENU,
  SET_CLIENTS,
  SELECT_TAG,
  SELECT_CLIENT,
  SET_PAYLOAD,
  CHANGE_SERVICE_URL,
  PRESENTATION_MODE,
  CLEAR_PRESENTATION_MODE,
  RULES,
  CLEAR_RULES,
  DISABLE_MENU_OPTIONS,
  ACTIVE_MENU_OPTION
} from './mutations-types'

export default {
  [DEFAULT] (state, value) {
    state.value = value
  },
  [SET_MENU] (state, value) {
    state.menu = Object.assign({}, state.menu, value)
  },
  [SET_CLIENTS] (state, value) {
    state.clients = value
  },
  [SELECT_CLIENT] (state, index) {
    state.clientSelected = index
  },
  [SELECT_TAG] (state, index) {
    state.tagSelected = index
  },
  [SET_PAYLOAD] (state, value) {
    state.payload = Object.assign({}, state.payload, value)
  },
  [CHANGE_SERVICE_URL] (state, value) {
    state.serviceUrl = value
  },
  [PRESENTATION_MODE] (state, value) {
    state.presentationMode = value
  },
  [CLEAR_PRESENTATION_MODE] (state) {
    state.presentationMode = ''
  },
  [RULES] (state, value) {
    state.rules = value
  },
  [CLEAR_RULES] (state) {
    state.rules = []
  },
  [DISABLE_MENU_OPTIONS] (state) {
    for (let i = 0; i < state.menu.options.length; i++) {
      state.menu.options[i] = disableOption(state.menu.options[i])
    }
  },
  [ACTIVE_MENU_OPTION] (state, idx, opt) {
    state.menu.options[idx] = opt
  }
}

function disableOption (opt) {
  opt.active = false
  if (opt.options) {
    for (let i = 0; i < opt.options.length; i++) {
      opt.options[i] = disableOption(opt.options[i])
    }
  }
  return opt
}
