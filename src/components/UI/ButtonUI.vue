<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button-UI'
}
</script>

<style scoped>
.btn {
  padding: 8px 10px;
  border: 1px solid teal;
  color: teal;
}
</style>
