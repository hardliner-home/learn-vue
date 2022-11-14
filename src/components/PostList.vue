<template>
  <div v-if="posts.length > 0">
    <h3>Posts List</h3>
    <TransitionGroup name="post-list">
      <post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @remove="$emit('remove', post)"
      />
    </TransitionGroup>
  </div>
  <div v-else>
    <h3>Posts list is empty</h3>
  </div>
</template>

<script>
import Post from '@/components/Post'

export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  components: {
    Post
  },
  name: 'PostList'
}
</script>

<style scoped>
.post-list-move,
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
