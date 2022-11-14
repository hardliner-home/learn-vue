<template>
  <form @submit.prevent>
    <Input-UI
      v-focus
      v-model="post.title"
      placeholder="Title..."
      type="text"
    />
    <Input-UI
      v-model="post.body"
      placeholder="Body..."
      type="text"
    />
    <Button-UI
      class="post_btn"
      @click="createPost"
    >
      Create
    </Button-UI>
  </form>
</template>

<script>

export default {
  name: 'PostForm',
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.post_btn {
  margin-top: 10px;
  align-self: flex-end;
}
</style>
