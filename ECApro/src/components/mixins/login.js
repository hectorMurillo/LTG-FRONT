const loginMixin = {
  methods: {
    logout () {
      window.localStorage.clear()
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}

export default loginMixin
