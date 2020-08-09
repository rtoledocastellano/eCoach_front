<template>
  <v-app>
    <div>
      <Navbar />
    </div>
    <v-main class="v-application">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <NavigationMenu />
  </v-app>
</template>

<script>
import Navbar from '@@/components/navbar'
import NavigationMenu from '@@/components/navigation-menu'

export default {
  components: {
    Navbar,
    NavigationMenu,
  },
}
</script>

<style>
.v-application {
  background-color: #9e9e9e;
}
</style>
