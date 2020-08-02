<template>
  <v-card class="mx-auto mt-10 mb-10" max-width="344" @click="seeCustomer">
    <v-card-text>
      <div>Id: {{ customer._id }}</div>
      <p class="display-1 text--primary">
        {{ customer.name }}
      </p>
      <div class="text--primary">
        email: {{ customer.email }}<br />
        tlf: {{ customer.telephone }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    customer: Object,
  },
  methods: {
    seeCustomer() {
      this.customer.name = this.customer.name + 'Fortu'
    },
  },
}
</script>
