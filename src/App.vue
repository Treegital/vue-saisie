<template>
<div id="app">
  <h1>Saisie</h1>
  <h2 v-if="status.logged_in">
    <span v-if="current_item.filename">
      Fichier actuellement assigné: {{current_item.filename}}
    </span>
    <span v-else>
      Pas de fichier assigné.
    </span>
  </h2>
  <nav class="navbar navbar-default">
    <div class="container">
      <ul class="nav navbar-nav">
        <li v-if="!status.logged_in">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="status.logged_in && !current_item.filename">
          <router-link to="/assign">Assign</router-link>
        </li>
        <li v-if="status.logged_in && current_item.filename">
          <router-link to="/deassign">Deassign</router-link>
        </li>
        <li v-if="status.logged_in && current_item.filename">
          <router-link to="/input">Input</router-link>
        </li>
        <li v-if="status.logged_in" @click="logout()">
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
        ...mapState('account', ['status']),
        ...mapState('items', ['current_item'])
    },
    methods: {
        ...mapActions('account', ['logout']),
        print: function() {
            console.log(this.current_item);
        }
    }
}
</script>

<style lang="scss">
</style>
