<template>
<section id="app" class="section">
  <h2 v-if="status.logged_in" class="subtitle">
    <span v-if="current_item.filename">
      Fichier actuellement assigné: {{current_item.filename}}
    </span>
    <span v-else>
      Pas de fichier assigné.
    </span>
  </h2>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div id="saisie-nav" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/assign" class="navbar-item"
                     v-if="status.logged_in && !current_item.filename"
                     >Assign</router-link>
        
        <router-link to="/deassign" class="navbar-item"
                     v-if="status.logged_in && current_item.filename"
                     >Deassign</router-link>
        
        <router-link to="/input" class="navbar-item"
                     v-if="status.logged_in && current_item.filename"
                     >Input</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link
            to="/login" v-if="!status.logged_in"
            class="button is-primary">Login</router-link>
          <a @click="logout()"
             v-if="status.logged_in"
             class="button is-primary">Logout</a>
        </div>
      </div>
    </div>
  </nav>
  <div class="section">
    <router-view></router-view>
  </div>
</section>
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
