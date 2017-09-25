import {
  DEFAULT,
  SET_MENU,
  SET_CLIENTS,
  SELECT_CLIENT,
  SET_PAYLOAD,
  SELECT_TAG,
  CHANGE_SERVICE_URL,
  PRESENTATION_MODE,
  CLEAR_PRESENTATION_MODE,
  RULES,
  CLEAR_RULES,
  DISABLE_MENU_OPTIONS,
  ACTIVE_MENU_OPTION
} from './mutations-types'
export default {
  actionDefault (context, value) {
    context.commit(DEFAULT, value)
  },
  setMenu (context, value) {
    context.commit(SET_MENU, value)
  },
  setClients (context, value) {
    context.commit(SET_CLIENTS, value)
  },
  selectClient (context, value) {
    context.commit(SELECT_CLIENT, value)
  },
  selectTag (context, index) {
    context.commit(SELECT_TAG, index)
  },
  setPayload (context, value) {
    context.commit(SET_PAYLOAD, value)
  },
  changeService (context, value) {
    context.commit(CHANGE_SERVICE_URL, value)
  },
  setPresentationMode (context, value) {
    context.commit(PRESENTATION_MODE, value)
  },
  clearPresentationMode (context) {
    context.commit(CLEAR_PRESENTATION_MODE)
  },
  menuPreChange (context) {
    context.commit(DISABLE_MENU_OPTIONS)
    context.commit(CLEAR_PRESENTATION_MODE)
    context.commit(CLEAR_RULES)
  },
  activeMenuOption (context, {index, opt}) {
    context.commit(ACTIVE_MENU_OPTION, {index, opt})
  },
  setRules (context, value) {
    context.commit(RULES, value)
  }
}
