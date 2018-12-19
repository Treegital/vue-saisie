<template>
<div>
  username
  <input type="input" name="username" v-model="credentials.username" />
  pass
  <input type="password" name="username" v-model="credentials.password" />

  <button v-on:click="submit">submit</button>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            errors: null,
            credentials: {
                username: null,
                password: null
            },
      }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        submit() {
            this.login(this.credentials)
        }
    },
}
</script>
