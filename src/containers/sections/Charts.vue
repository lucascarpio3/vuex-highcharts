<template>
  <div :class="[{fixed: menu.fixed}]">
    <transition name="come-from-right">
      <my-menu :options="menu.options"
               @selectOption="selectOption"
               :class="['menu-container', {fixed: menu.fixed}]" v-if="menu.fixed || menu.show">
        <div slot="actions" class="menu-actions">
          <i :class="['fa', 'fa-thumb-tack', {rotate: menu.fixed} ]" aria-hidden="true" @click="toggleFixMenu"></i>
        </div>
      </my-menu>
    </transition>
    <div v-if="presentationMode === 'TABLE'"
         class="chart-container">
      <table-data :options="options"></table-data>
    </div>

    <div class="chart-container" v-else-if="options && options.length > 0">
      <div v-for="option in options" class="chart">
        <highcharts :options="option"></highcharts>
      </div>
    </div>
  </div>
</template>

<script>
  import MyMenu from 'src/components/Menu.vue'
  import Modal from 'src/components/Modal'
  import {mapState, mapActions} from 'vuex'
  import TableData from 'components/TableData'
  export default {
    components: {
      MyMenu,
      Modal,
      TableData
    },
    computed: {
      ...mapState({
        menu: state => state.menu,
        clients: state => state.clients,
        clientSelected: state => state.clientSelected,
        rules: state => state.rules,
        presentationMode: ({presentationMode}) => presentationMode,
        payload: ({payload}) => payload,
        serviceUrl: ({serviceUrl}) => serviceUrl
      })
    },
    data () {
      return {
        options: []
      }
    },
    methods: {
      ...mapActions([
        'setMenu',
        'setClients',
        'selectClient',
        'activeMenuOption',
        'setPresentationMode',
        'clearPresentationMode'
      ]),
      toggleFixMenu () {
        this.setMenu({fixed: !this.menu.fixed, show: false})
        this.reRenderChart()
      },
      selectOption (index, opt) {
        this.activeMenuOption({index, opt})
        this.options = []
        setTimeout(() => this.reloadChart(), 0)
      },
      reloadChart () {
        this.$http.post(`http://192.168.1.227:8082${this.serviceUrl}`, this.payload).then(result => {
          if (result.body.presentation) {
            this.setPresentationMode(result.body.presentation)
          } else {
            this.clearPresentationMode()
          }
          if (result.body.data) {
            this.options = result.body.data
          } else {
            this.options = result.body
          }
        })
      },
      handlerSelectClient (opt) {
        this.selectClient(this.clients.findIndex(item => item.startsWith(`${opt.value}-@`)))
        this.payload.cliente = opt.value
      },
      reRenderChart () {
        const options = this.options
        this.options = {}
        setTimeout(() => {
          this.options = options
        }, 0)
      }
    },
    watch: {
      'payload': {
        handler () {
          this.reloadChart()
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss">
  .m-1 {
    margin: .8rem;
  }

  .fixed .m-1 {
    margin-top: 42px;
  }
</style>
