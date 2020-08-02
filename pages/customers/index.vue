<template>
  <v-layout>
    <v-container>
      <v-col cols="10" class="mt-10 mx-auto">
        <h1>Mis Clientes</h1>
        <CustomerCard
          v-for="(customer, idx) in customers"
          :key="idx"
          :customer="customer"
          @click="seeCustomer"
        />
      </v-col>
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
      .get('/customers', { headers: { token: localStorage.getItem('token') } })
      .then((response) => (this.customers = response.data))
  },
}
</script>
