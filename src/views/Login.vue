<template>
<div>
  <FormSchema v-model="formData" ref="formSchema" @submit="submit">
    <button type="submit">Login</button>
  </FormSchema>
</div>
</template>

<script>
import axios from 'axios'
import { LOGIN_URL } from '@/services/auth'
import { mapState, mapActions } from 'vuex'
import FormSchema from '@formschema/native'

export default {
    data() {
        return {
            errors: null,
            formData: {},
      }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        submit(e) {
            e.preventDefault();
            this.login(this.formData)
        }
    },
    created: function() {
        axios.get(LOGIN_URL)
            .then((response) => {
                this.errors = this.$refs.formSchema.load(response.data);
            }).catch((err) => {
                console.log(err)
            })
    },
    components: { FormSchema }
}
</script>
