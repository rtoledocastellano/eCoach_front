<template>
  <v-container fluid>
    <v-row class="text-center" align="center">
      <v-col cols="12" class="main">
        <div>
          <h1>eCoach</h1>
          <p>
            La aplicación que te permitirá llevar a tus clientes al siguiente
            nivel
          </p>
          <p>¿Quieres probarlo?</p>
        </div>
      </v-col>
      <v-col cols="12" class="text-center mt-5">
        <v-btn color="#F9D56E" nuxt to="/login">Start Now</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'landing',
}
</script>

<style lang="scss" scoped>
.main {
  height: 450px;
  padding-top: 200px;
  color: white;
  h1 {
    font-size: 60px;
    font-weight: bold;
  }
  p {
    font-weight: bold;
    font-size: 20px;
  }
}
</style>
