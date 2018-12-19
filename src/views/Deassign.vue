<template>
<div>
  <h1>Se déssaisir du fichier</h1>
  <button @click="deassign()">Confirm</button>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions('items', ['deassign']),
    },
}
</script>
