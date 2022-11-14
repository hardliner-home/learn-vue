<template>
  <select v-model="modelValue" @change="changeOptions">
    <option disabled value="">Choose filter option</option>
    <option
      v-for="option in options"
      :value="option.value"
      :key="option.label"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'Select-UI',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOptions(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<style scoped>

</style>
