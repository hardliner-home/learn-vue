<template>
  <div class="modal" v-if="show" @click.stop="closeModal">
    <div @click.stop class="modal-container">
      <div v-if="header" class="modal-header">
        <h3>{{ header }}</h3>
      </div>

      <div class="modal-body"><slot></slot></div>
    </div>
  </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin'

export default {
  name: 'Modal-UI',
  props: {
    header: {
      type: String,
      required: true
    },
  },
  mixins: [toggleMixin],
  mounted() {
    console.log('Dialog mounted')
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
}

.modal-container {
  min-width: 50%;
  min-height: 50px;
  background: white;
  border-radius: 5px;
  margin: auto;
  padding: 20px;
}
</style>
