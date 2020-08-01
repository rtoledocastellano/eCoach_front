<template>
  <v-app>
    <div>
      <Navbar />
    </div>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :absolute="!fixed" app>
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
