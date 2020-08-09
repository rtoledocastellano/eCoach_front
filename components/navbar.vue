<template>
  <v-app-bar color="primary" class="white--text" dense>
    <v-app-bar-nav-icon @click="goBack">
      <v-icon class="white--text">mdi-arrow-left</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title style="cursor: pointer;" @click="$router.push('/')">
      eCoach
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div id="searchNavBar">
      <v-text-field
        v-model="searchItem"
        label="Nombre"
        solo
        prepend-inner-icon="mdi-magnify"
        @keyup.enter="search"
      ></v-text-field>
    </div>
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
    goBack() {
      this.$router.go(-1)
    },
    goHome() {
      this.$router.push('/calendar')
    },
  },
}
</script>

<style lang="scss">
#searchNavBar {
  margin-top: 23px;
}
</style>
