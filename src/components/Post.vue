<template>
  <div class="post">
    <div class="post_data">
      <text><strong>Title:</strong>{{ post.title }}</text>
      <text><strong>Body:</strong>{{ post.body }}</text>
    </div>
    <Button-UI @click="$router.push(`/posts/${post.id}`)">More..</Button-UI>
    <Button-UI @click="$emit('remove', post)">Delete</Button-UI>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>
.post {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 2px solid green;
  margin-top: 15px;
}

.post_data {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
