<template>
  <v-app>
    <div>
      <Navbar />
    </div>
    <v-main class="v-application-default mb-10">
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
.v-application-default {
  background-color: #e0ece4;
}
</style>
