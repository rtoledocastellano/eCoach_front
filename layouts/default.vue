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
  background-image: url('https://i.ibb.co/6826pBV/Sin-t-tulo-1.png');
  background-position: center;
  background-size: cover;
}
</style>
