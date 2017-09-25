<template>
  <table class="table">

    <tr>
      <th v-if="typeTable === 'string'">Dado</th>
      <th v-else v-for="key in keys">{{key}}</th>
    </tr>
    <tr v-if="options" v-for="option in options">
      <td v-if="typeTable === 'string'">{{option}}</td>
      <td v-else v-for="key in keys">{{option[key]}}</td>
    </tr>
  </table>
</template>
<script>
  export default {
    props: {
      options: {
        required: true
      }
    },
    computed: {
      typeTable () {
        return typeof this.options[0] || 'string'
      },
      keys () {
        return this.typeTable !== 'string' && this.options && Object.keys(this.options[0])
      }
    }
  }
</script>
