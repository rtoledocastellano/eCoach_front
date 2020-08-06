<template>
  <v-app>
    <div>
      <Navbar />
    </div>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from '@@/components/navbar'
export default {
  components: {
    Navbar,
  },
}
</script>
