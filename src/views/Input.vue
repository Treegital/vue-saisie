<template>
<div>
  <table class="table table-striped table-bordered" v-if="docs.length > 0">
    <tr>
      <th></th>
      <th>Page de début</th>
      <th>Qualité</th>
      <th>Gommette</th>
      <th>Actions</th>
    </tr>
    <tr v-for="(doc, idx) in docs" :key="idx">
      <td>
        {{idx}}
      </td>
      <td>
        <input type="number" v-model="docs[idx].page" />
      </td>
      <td>
        <input type="number" v-model="docs[idx].quality" />
      </td>
      <td>
        <input type="checkbox" v-model="docs[idx].marked" />
      </td>
      <td>
        <button @click="remove(idx)">X</button>
      </td>
    </tr>
  </table>
  <button @click="add">Ajouter un document</button>
  <button @click="sort">Réorganisation automatique</button>
  <button @click="submit">Envoyer</button>
</div>
</template>

<script>
export default {
    data() {
        return {
            docs: [],
            errors: null,
      }
    },
    conputed: {
        lastpage: function() {
            if (!this.docs) {
                return 0;
            }
            return this.docs[this.docs.length - 1].page
        }
    },
    methods: {
        submit() {
            console.log(JSON.stringify(this.docs))
        },
        sort() {
            this.docs.sort((a, b) => a.page - b.page);
        },
        remove(idx) {
            this.docs.splice(idx, 1);
        },
        add() {
            this.sort();
            this.docs.push({
                page: this.lastpage + 1,
                quality: 0,
                marked: false
            })
        }
    },
}
</script>
