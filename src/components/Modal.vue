<template>
  <div>
    <transition name="animated">
      <div v-show="isOpen" class="modal show">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{title}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="dismiss">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <slot name="body">
                <p>Modal body text goes here.</p>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
              </slot>
              <button type="button" class="btn btn-secondary" @click="dismiss">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="isOpen" class="modal--black-layer"></div>
    </transition>
  </div>
</template>
<script>
  export default {
    props: {
      isOpen: {type: Boolean, required: true},
      title: {type: String, default: 'Modal Tittle'}
    },
    methods: {
      dismiss () {
        this.$emit('dismiss')
      }
    },
    watch: {
      isOpen (val) {
        if (val) {
          window.document.body.style.overflow = 'hidden'
        } else {
          window.document.body.style.overflow = 'auto'
        }
      }
    }
  }
</script>
