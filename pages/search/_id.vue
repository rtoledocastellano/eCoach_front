<template>
  <v-layout>
    <h3>Mis Clientes</h3>
    <CustomerCard
      v-for="(customer, idx) in customers"
      :key="idx"
      :customer="customer"
      @click="seeCustomer"
    />
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
