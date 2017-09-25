<template>
  <div :class="['dropdown', 'btn-group', {open: open}]">
    <button v-show="!open" type="button" class="btn btn-default dropdown-toggle px-1" @click="toggle"
            ref="btnSearch" v-if="selected && typeof selected === 'object'">
      <img v-if="selected && selected.icon" :src="selected.icon" :alt="selected.value">
      <span class="dropdown-text">{{selected && selected.text || placeholder}}</span>
    </button>
    <button v-show="!open" type="button" class="btn btn-default dropdown-toggle px-1" @click="toggle"
            ref="btnSearch" v-else>
      <span class="dropdown-text">{{selected || placeholder}}</span>
    </button>
    <div class="input-group" v-show="open">
      <input ref="search" class="inp px-1" type="text" v-model="searchTerm" @blur="blur"
             @keyup.enter="selectFirst" @keyup.down="focusNext" @keyup.up="focusPrev">
    </div>
    <ul ref="menu" class="dropdown-menu" v-show="open && optionsFiltred.length > 0">
      <li ref="item" :class="['dropdown-item',{focused:index === focused}]" v-for="(option, index) in optionsFiltred"
          @click="select(option)"
          v-if="typeof option === 'object'">
        <img :src="option.icon" :alt="option.value" v-if="option.icon">
        {{option.text}}
      </li>
      <li ref="item" :class="['dropdown-item',{focused:index === focused}]" v-for="(option, index) in optionsFiltred"
          @click="select(option, index)"
          v-if="typeof option !== 'object'">
        {{option}}
      </li>
    </ul>
  </div>
</template>
<script>
  import {removeDiacritics} from 'src/api/tools'
  let timeout
  export default {
    props: {
      placeholder: {type: String, default: 'Selecione'},
      options: {required: true, type: Array},
      defaultIndex: {type: Number, default: 0}
    },
    computed: {
      optionsFiltred () {
        return this.options.filter(this.filterOptions)
      }
    },
    data () {
      return {
        open: false,
        selected: null,
        searchTerm: '',
        focused: this.defaultIndex
      }
    },
    watch: {
      defaultIndex (newIndex) {
        this.options.length > 0 && this.select(this.options[newIndex])
      },
      open (value) {
        if (value) {
          setTimeout(() => {
            this.$refs.search.focus()
          }, 0)
        }
      },
      searchTerm (term) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          this.$emit('changeSearchTerm', term)
        }, 300)
      }
    },
    mounted () {
      this.options.length > 0 && this.defaultIndex && this.select(this.options[this.defaultIndex])
    },
    methods: {
      toggle () {
        this.open = !this.open
      },
      close () {
        this.open = false
      },
      select (option, index) {
        this.selected = option
        this.focused = index
        this.$emit('dropdownChange', option)
        this.close()
      },
      blur () {
        setTimeout(() => {
          this.close()
          this.searchTerm = ''
        }, 300)
      },
      filterOptions (opt) {
        if (typeof opt === 'object') {
          return removeDiacritics(opt.text.toLowerCase()).indexOf(removeDiacritics(this.searchTerm.toLowerCase())) >= 0
        } else {
          return removeDiacritics(opt.toLowerCase()).indexOf(removeDiacritics(this.searchTerm.toLowerCase())) >= 0
        }
      },
      focusNext () {
        if (this.focused < this.optionsFiltred.length - 1) {
          this.focused++
        } else {
          this.focused = 0
        }
        const diff = this.$refs.item[this.focused].offsetTop + this.$refs.item[this.focused].offsetHeight - this.$refs.menu.scrollTop
        if (diff < 0 || diff >= 300) {
          this.$refs.menu.scrollTop = this.$refs.item[this.focused].offsetTop - (300 - this.$refs.item[this.focused].offsetHeight)
        }
      },
      focusPrev () {
        if (this.focused > 0) {
          this.focused--
        } else {
          this.focused = this.optionsFiltred.length - 1
        }
        const diff = this.$refs.item[this.focused].offsetTop - this.$refs.menu.scrollTop
        if (diff < 0 || diff > 300) {
          this.$refs.menu.scrollTop = this.$refs.item[this.focused].offsetTop
        }
      },
      selectFirst () {
        this.focused = this.focused || 0
        if (this.optionsFiltred.length > 0) {
          this.selected = this.optionsFiltred[this.focused]
          this.$emit('dropdownChange', this.optionsFiltred[this.focused])
          this.close()
        }
      }
    }
  }
</script>
