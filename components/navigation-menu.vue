<template>
  <v-bottom-navigation background-color="primary">
    <v-btn value="Home" @click="goToHome">
      <span class="white--text">Home</span>
      <v-icon class="white--text">mdi-home-account</v-icon>
    </v-btn>

    <v-btn value="customers" @click="goToCustomers">
      <span class="white--text">Customers</span>
      <v-icon class="white--text">mdi-account</v-icon>
    </v-btn>

    <v-btn value="NewCustomer" @click="goToNewCustomers">
      <span class="white--text">New Customer</span>
      <v-icon class="white--text">mdi-account-plus</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'NavigationMenu',
  methods: {
    goToCustomers() {
      this.$router.push('/customers')
    },
    goToNewCustomers() {
      this.$router.push('/customers/new')
    },
    goToHome() {
      this.$router.push('/calendar')
    },
  },
}
</script>
