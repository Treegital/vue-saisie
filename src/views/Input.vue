<template>
<div>
  <div v-if="error" class="notification is-danger">
    {{ error }}
  </div>
  <div class="columns" v-if="this.about">  
    <div class="column is-three-quarters">
      <table class="table" v-if="docs.length > 0">
        <tr>
          <th>Document</th>
          <th>Identifiant</th>
          <th>Page de fin</th>
          <th>Qualité</th>
          <th>Gommette</th>
          <th>Actions</th>
        </tr>
        <tr v-for="(doc, idx) in docs" :key="idx">
          <td>
            {{idx + 1}}
          </td>
          <td>
            <input type="text" class="input"
                   v-bind:class="[is_errored(idx, 'identifier') ? 'is-danger' : 'is-success']"
                   v-model="docs[idx].identifier" />
          </td>
          <td>
            <input type="number" class="input"
                   v-bind:class="[is_errored(idx, 'page') ? 'is-danger' : 'is-success']"
                   v-model.number="docs[idx].page" />
          </td>
          <td>
            <input type="number" class="input"
                   v-bind:class="[is_errored(idx, 'quality') ? 'is-danger' : 'is-success']"
                   v-model.number="docs[idx].quality" />
          </td>
          <td>
            <select class="select" v-model="docs[idx].mark">
              <option value="S">Supprimer</option>
              <option value="D">Doublon</option>
              <option value="G">Gommette</option>
            </select>
        </td>
          <td>
          <button class="button is-danger" @click="remove(idx)">X</button>
          </td>
        </tr>
      </table>
      <button class="button is-primary"
              @click="add">Ajouter un document</button>
      <button class="button"
              @click="sort">Réorganisation automatique</button>
      <button class="button is-link"
              @click="submit">Envoyer</button>
    </div>
    <div class="column">
      <nav class="panel">
        <p class="panel-heading">
          Information
        </p>
        <div class="panel-block">
          <div class="tags has-addons">
            <span class="tag is-dark is-medium">Lot</span>
            <span class="tag is-medium">{{ this.about.filename }}</span>
          </div>
        </div>
        <div class="panel-block">
          <div class="tags has-addons">
            <span class="tag is-dark is-medium">Pages</span>
            <span class="tag is-medium">{{ this.about.pages }}</span>
          </div>
        </div>
      </nav>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { items_service } from '@/services/items';

export default {
    data() {
        return {
            docs: [],
            input_errors: new Map(),
            about: null,
            error: null,
        }
    },
    computed: {
        ...mapState('items', ['current_item']),
        lastpage: function() {
            if (!this.docs) {
                return 0;
            }
            return Math.max.apply(Math, this.docs.map(function(o) {
                return o.page;
            }))
        }
    },
    watch: {
        docs: {
            handler: function() {
                this.input_errors = this.check();
            },
            deep: true,
        }
    },
    methods: {
        is_errored(idx, name) {
            if (this.input_errors.has(idx)) {
                return this.input_errors.get(idx)[name] === true;
            }
        },
        check() {
            var seen = new Set();
            var errors = new Map();
            var size = this.about.pages;
            this.docs.forEach(function(doc, idx) {
                var error = {}
                if (!doc.page || doc.page > size || doc.page < 1 || seen.has(doc.page)) {
                    error.page = true
                }
                if (doc.quality < 0) {
                    error.quality = true
                }
                if (!doc.identifier) {
                    error.identifier = true
                }
                seen.add(doc.page);
                if (Object.keys(error).length) {
                    errors.set(idx, error)
                }
            })
            return errors;
        },
        submit() {
            if (!this.input_errors.size) {
                if (this.lastpage == this.about.pages) {
                    console.log('send !!');
                } else {
                    this.error = "It seems some pages are missing."
                }
            }
        },
        sort() {
            this.docs.sort((a, b) => a.page - b.page);
        },
        remove(idx) {
            this.docs.splice(idx, 1);
        },
        add() {
            if (!this.input_errors.size) {
                this.docs.push({
                    identifier: "",
                    page: this.lastpage + 1,
                    quality: 0,
                    mark: ""
                })
            } else {
                this.error = "Please fix existing errors before adding a new line"
            }
        }
    },
    created() {
        items_service.about(
            this.$store.state.items.current_item.filename).then(
                data => {
                    this.about = data
                });
    }
}
</script>
