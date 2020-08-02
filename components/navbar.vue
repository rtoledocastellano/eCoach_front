<template>
  <v-app-bar color="#1B262C" dense>
    <v-toolbar-title>eCoach</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field
      label="Nombre"
      solo
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>
