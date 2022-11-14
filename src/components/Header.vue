<template>
  <div class="header">
    <h3>Vue</h3>

    <div>
      <router-link
        v-for="link in links"
        :key="link.label"
        class="link"
        :to="link.link"
      >
        {{ link.label }}
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      links: [
        { id: 0, label: 'Home', link: '/' },
        { id: 1, label: 'Posts', link: '/posts' },
        { id: 2, label: 'With Store', link: '/store' },
      ]
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: bisque;
  justify-content: space-between;
  padding: 15px
}

.active {
  color: teal
}

.link {
  text-decoration: none;
  margin-right: 10px;
  color: black;
}
</style>
