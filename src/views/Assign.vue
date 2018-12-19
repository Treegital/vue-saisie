<template>
<div>
  <h1>Choose an item to work on</h1>
  <select v-model="selected">
    <option v-for="item in items" v-bind:value="item" v-bind:key="item">
      {{ item }}
    </option>
  </select>
  <button @click="submit">Select</button>
</div>
</template>

<script>
import { items_service } from '@/services/items'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            items: [],
            errors: null,
            selected: null,
      }
    },
    created() {
        items_service.available().then(
            items => {
                this.items = items;
            },
        );
    },
    methods: {
        ...mapActions('items', ['assign']),
        submit() {
            this.assign({filename: this.selected})
        }
    },
}
</script>
