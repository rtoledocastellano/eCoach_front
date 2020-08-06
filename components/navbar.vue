<template>
  <v-app-bar color="#1B262C" dense>
    <v-toolbar-title>eCoach</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field
      v-model="searchItem"
      label="Nombre"
      solo
      prepend-inner-icon="mdi-magnify"
      @keyup.enter="search"
    ></v-text-field>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      searchItem: '',
    }
  },
  methods: {
    search() {
      this.$router.push(`/search/${this.searchItem}`)
    },
  },
}
</script>
