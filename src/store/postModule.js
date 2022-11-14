import axios from 'axios'

export const postModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((p1, p2) => {
        return p1[state.selectedOption]?.localeCompare(p2[state.selectedOption])
      })
    },
    sortedAndFiltered(state, getters) {
      if (state.searchQuery.trim()) {
        return getters.sortedPosts.filter((post) => {
          return post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
        })
      }
      return getters.sortedPosts
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setSelectedOption(state, selectedOption) {
      state.selectedOption = selectedOption
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery
    },
    setPage(state, page) {
      state.page = page
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },
  },
  actions: {
    async fetchPosts({ state, commit, getters }) {
      commit('setLoading', true)

      axios.get(`https://jsonplaceholder.typicode.com/posts`, {
        params: {
          _page: state.page,
          _limit: state.limit
        }
      })
        .then((response) => {
          commit('setPosts', response.data)
          commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
        })
        .catch((error) => {
          alert(error.message)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    async fetchMorePosts({ state, commit }) {
      commit('setPage', state.page += 1)

      axios.get(`https://jsonplaceholder.typicode.com/posts`, {
        params: {
          _page: state.page,
          _limit: state.limit
        }
      })
        .then((response) => {
          // this.posts = this.posts.concat(response.data)
          commit('setPosts', [...state.posts, ...response.data])
          commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
        })
        .catch((error) => {
          alert(error.message)
        })
    },
  },
  namespaced: true
}
