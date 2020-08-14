<template>
  <v-layout>
    <v-container>
      <v-row>
        <v-col cols="12" class="mt-10 mx-auto">
          <h1>Mis Clientes</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(customer, idx) in customers" :key="idx" cols="12" md="4">
          <CustomerCard :customer="customer" />
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import CustomerCard from '@@/components/customer-card'

export default {
  components: {
    CustomerCard,
  },
  data() {
    return {
      customers: [],
    }
  },
  created() {
    this.$axios
      .get(`/customers/search/${this.$route.params.id}`, {
        headers: { token: localStorage.getItem('token') },
      })
      .then((response) => (this.customers = response.data))
  },
}
</script>
