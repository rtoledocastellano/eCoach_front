<template>
  <v-layout>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Mis Clientes</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(customer, idx) in visiblePages"
          :key="idx"
          cols="12"
          md="4"
        >
          <CustomerCard :customer="customer" />
        </v-col>
      </v-row>
      <v-pagination
        v-model="page"
        class="my-4"
        :length="
          (customers.length / perPage) % 0
            ? Math.floor(customers.length / perPage)
            : Math.floor(customers.length / perPage) + 1
        "
        :total-visible="perPage"
        circle
      ></v-pagination>
    </v-container>
  </v-layout>
</template>

<script>
import CustomerCard from '@@/components/customer-card'

export default {
  components: {
    CustomerCard,
  },
  async asyncData({ $axios, params }) {
    const headers = { headers: { token: localStorage.getItem('token') } }
    const customerData = await $axios.get(`customers/`, headers)
    return {
      customers: customerData.data,
    }
  },
  data() {
    return {
      page: 1,
      perPage: 6,
    }
  },
  computed: {
    visiblePages() {
      return this.customers.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      )
    },
  },
}
</script>
