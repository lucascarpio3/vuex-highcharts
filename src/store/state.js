import options from '../menuOptions.json'
export default {
  serviceUrl: '',
  payload: {
    inicio: '',
    fim: '',
    cliente: null,
    tipoTag: null
  },
  clients: [],
  clientSelected: 0,
  tags: [
    'TAGSCLIENTE',
    'TAGSVENDEDOR'
  ],
  tagSelected: null,
  rules: [],
  presentationMode: '',
  menu: {
    fixed: true,
    show: false,
    options
  }
}
