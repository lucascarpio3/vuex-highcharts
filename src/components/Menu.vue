<template>
  <div>
    <slot name="actions"></slot>
    <ul class="menu">
      <li v-for="(option, index) in options" v-if="option.hasOwnProperty('options')" :class="[{active: option.active}]">
        {{option.text}}
        <menu-option :options="option.options"
                     @selectOption="(idx, opt) => selectParent(option,index, idx, opt)"
                     @changeRestService="changeRestService">
        </menu-option>
      </li>
      <li @click="select(index, option)" v-else :class="[{active: option.active}]">{{option.text}}</li>
    </ul>
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'menu-option',
    props: {
      options: Array,
      root: Object
    },
    computed: {
      ...mapState({
        menu: state => state.menu,
        payload: state => state.payload
      })
    },
    methods: {
      ...mapActions([
        'setMenu',
        'changeService',
        'setPayload',
        'clearPresentationMode',
        'menuPreChange',
        'setRules'
      ]),
      select (index, opt) {
        this.menuPreChange()
        this.$set(opt, 'active', true)
        this.$emit('selectOption', index, opt)
        this.changeService(opt.action)
        if (opt.payload) {
          this.setPayload(Object.assign({}, this.payload, opt.payload))
        }
        if (opt.needed && opt.needed.length > 0) {
          this.setRules(opt.needed)
        }
        this.setMenu({show: false})
      },
      changeRestService (opt) {
        this.$emit('changeRestService', opt)
      },
      selectParent (option, index, idx, opt) {
        this.$set(option, 'active', true)
        option.options[idx] = opt
        this.$emit('selectOption', index, option)
      }
    },
    watch: {
      options: {
        handler () {
          this.$forceUpdate()
        },
        deep: true
      }
    }
  }
</script>
