<template>
  <div class="topbar">
    <span @click="setMenu({show: !menu.show})" class="menu-btn"><i class="fa fa-bars"></i></span>
    <label>Data inicial:&nbsp</label>
    <datepicker :l10n="language"
                placeholder="Selecione a data"
                :value="payload.inicio"
                @input="val => setPayload({inicio: val})"
                :config="datePickerConfigs"></datepicker>
    <label>Data final:&nbsp</label>
    <datepicker :l10n="language"
                placeholder="Selecione a data"
                :value="payload.fim"
                @input="val => setPayload({fim: val})"
                :config="datePickerConfigs"></datepicker>
    <label v-if="rules && rules.includes('cliente_id')">Cliente:</label><br>
    <dropdown :options="clients" placeholder="Selecione um cliente"
              v-if="rules && rules.includes('cliente_id')"
              @changeSearchTerm="getClients"
              :defaultIndex="0"
              @dropdownChange="opt => setPayload({cliente: opt.value})" ref="dropdownClient"></dropdown>
    <label v-if="rules && rules.includes('tags')">Tags:</label>
    <dropdown placeholder="Selecione uma tag" :options="tags"
              v-if="rules && rules.includes('tags')"
              @dropdownChange="opt => setPayload({tipoTag: opt})" ref="dropdownTag" :defaultIndex="0"></dropdown>
  </div>
</template>
<script>
  import Datepicker from 'vue-bulma-datepicker'
  import Dropdown from 'src/components/Dropdown'
  import moment from 'moment'
  import {pt} from 'src/datepicker-l10n/pt.js'
  import {mapState, mapActions} from 'vuex'
  export default {
    components: {
      Datepicker,
      Dropdown
    },
    created () {
      this.getClients('')
    },
    mounted () {
      this.setPayload({
        inicio: moment().locale('pt-br').format('DD/MM/YYYY 00:00:00'),
        fim: moment().locale('pt-br').format('DD/MM/YYYY 23:59:59')
      })
    },
    computed: {
      ...mapState({
        menu: state => state.menu,
        payload: state => state.payload,
        rules: state => state.rules,
        clients: state => state.clients,
        clientSelected: ({clientSelected}) => clientSelected,
        tags: ({tags}) => tags
      })
    },
    methods: {
      ...mapActions([
        'setMenu',
        'setPayload',
        'setClients',
        'setPayload'
      ]),
      getClients (term) {
        this.$http.get(`http://192.168.1.227:8082/clientes?term=${term}`).then(result => {
          this.setClients(result.body.map(item => {
            const splited = item.split('-@')
            return {
              text: `${splited[1]} - ${splited[2]}`,
              value: splited[0]
            }
          }))
        })
      }
    },
    data () {
      return {
        language: pt,
        datePickerConfigs: {
          dateFormat: 'd/m/Y H:i:S',
          static: false,
          enableTime: true,
          time_24hr: true,
          defaultHour: 0,
          enableSeconds: true
        }
      }
    },
    watch: {
      rules (newRules) {
        setTimeout(() => {
          if (newRules.includes('cliente_id')) {
            this.$refs.dropdownClient.$el.getElementsByClassName('dropdown-toggle')[0].click()
          }
          if (this.rules.includes('tags')) {
            this.$refs.dropdownTag.$el.getElementsByClassName('dropdown-toggle')[0].click()
          }
        }, 0)
      }
    }
  }
</script>
