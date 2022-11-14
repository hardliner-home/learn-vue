<template>
  <div>
    <h2>Posts Page With Store</h2>

    <Input-UI
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Search..."
      class="search"
    />

    <div class="button-place">
      <Button-UI @click="openModal">Create Post</Button-UI>
      <Select-UI
        :model-value="selectedOption"
        @update:model-value="setSelectedOption"
        :options="options"
      />
    </div>

<!--    <Modal-UI-->
<!--      v-model:show="dialogVisible"-->
<!--      header="Create Post Modal"-->
<!--    >-->
<!--      <PostForm @create="createPost" />-->
<!--    </Modal-UI>-->

    <h3 v-if="loading">Loading Posts...</h3>
    <PostList
      v-else
      :posts="sortedAndFiltered"
      @remove="removePost"
    />

    <div v-intersection="{fetchMorePosts, page, totalPages}" class="observer" ref="observer"></div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'PostsWithStorePage',
  components: {
    PostForm,
    PostList
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPosts: 'post/setPosts',
      setLoading: 'post/setLoading',
      setSelectedOption: 'post/setSelectedOption',
      setSearchQuery: 'post/setSearchQuery',
      setPage: 'post/setPage',
      setTotalPages: 'post/setTotalPages'
    }),
    ...mapActions({
      fetchMorePosts: 'post/fetchMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
    removePost(post) {
      this.setPosts(this.posts.filter((postItem) => postItem.id !== post.id))
    },
    openModal() {
      this.dialogVisible = true
    }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      loading: (state) => state.post.loading,
      selectedOption: (state) => state.post.selectedOption,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      options: (state) => state.post.options,
    }),
    ...mapGetters({
      sortedAndFiltered: 'post/sortedAndFiltered',
      sortedPosts: 'post/sortedPosts'
    }),
  },
};
</script>

<style scoped>
.button-place {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.observer {
  height: 30px;
  background: teal;
}

.search {
  width: 100%;
  margin-bottom: 10px;
}
</style>
