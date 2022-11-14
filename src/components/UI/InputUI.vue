<template>
  <input :value="modelValue" @input="updateInput" />
</template>

<script>
export default {
  name: 'Input-UI',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<style scoped>
input {
  padding: 10px 15px;
  border: 1px solid teal;
  margin-top: 10px;
}
</style>
