<template>
  <div>
    <h2>Posts Page</h2>

    <Input-UI v-model="searchQuery" placeholder="Search..." class="search" />

    <div class="button-place">
      <Button-UI @click="openModal">Create Post</Button-UI>
      <Select-UI
        v-model="selectedOption"
        :options="options"
      />
    </div>

    <Modal-UI
      v-model:show="dialogVisible"
      header="Create Post Modal"
    >
      <PostForm @create="createPost" />
    </Modal-UI>

    <h3 v-if="loading">Loading Posts...</h3>
    <PostList
      v-else
      :posts="sortedAndFiltered"
      @remove="removePost"
    />

    <div v-intersection="{fetchMorePosts, page, totalPages}" class="observer" ref="observer"></div>
    <!--    <div class="pagination">-->
    <!--      <div-->
    <!--        v-for="pageNumber in totalPages"-->
    <!--        class="single-page"-->
    <!--        :class="{-->
    <!--          'current-page': page === pageNumber-->
    <!--        }"-->
    <!--        @click="page = pageNumber"-->
    <!--      >-->
    <!--        {{ pageNumber }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import axios from 'axios'

export default {
  name: 'PostsPage',
  components: {
    PostForm,
    PostList
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      loading: false,
      options: [
        { value: 'title', label: 'By Title' },
        { value: 'body', label: 'By Body' },
      ],
      selectedOption: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter((postItem) => postItem.id !== post.id)
    },
    openModal() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      this.loading = true

      axios.get(`https://jsonplaceholder.typicode.com/posts`, {
        params: {
          _page: this.page,
          _limit: this.limit
        }
      })
        .then((response) => {
          // this.posts = this.posts.concat(response.data)
          this.posts = response.data
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        })
        .catch((error) => {
          alert(error.message)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async fetchMorePosts() {
      this.page += 1

      axios.get(`https://jsonplaceholder.typicode.com/posts`, {
        params: {
          _page: this.page,
          _limit: this.limit
        }
      })
        .then((response) => {
          // this.posts = this.posts.concat(response.data)
          this.posts = [...this.posts, ...response.data]
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        })
        .catch((error) => {
          alert(error.message)
        })
    },
  },
  mounted() {
    this.fetchPosts()

    // let options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    //
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.fetchMorePosts()
    //   }
    // }
    //
    // let observer = new IntersectionObserver(callback, options)
    // observer.observe(this.$refs.observer)
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((p1, p2) => {
        return p1[this.selectedOption]?.localeCompare(p2[this.selectedOption])
      })
    },
    sortedAndFiltered() {
      if (this.searchQuery.trim()) {
        return this.sortedPosts.filter((post) => {
          return post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        })
      }
      return this.sortedPosts
    },

  },
  // watch: {
  //   page() {
  //     this.fetchPosts()
  //   }
  // }
};
</script>

<style scoped>
.button-place {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

/*.pagination {*/
/*  display: flex;*/
/*  margin-top: 15px;*/
/*}*/

/*.single-page {*/
/*  padding: 10px;*/
/*  border: 1px solid black;*/
/*}*/

/*.current-page {*/
/*  border: 2px solid teal;*/
/*}*/

.observer {
  height: 30px;
  background: teal;
}

.search {
  width: 100%;
  margin-bottom: 10px;
}
</style>
