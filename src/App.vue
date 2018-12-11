<template>
<div id="app">
  <nav class="navbar navbar-default">
    <div class="container">
      <ul class="nav navbar-nav">
        <li v-if="!status.loggedIn">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="status.loggedIn">
          <router-link to="/start">Start</router-link>
        </li>
        <li v-if="status.loggedIn" @click="logout()">
          <router-link to="/login">Logout</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <div class="container">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('account', ['logout']),
    }
}
</script>

<style lang="scss">
</style>
