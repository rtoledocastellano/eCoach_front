<template>
  <div>
    <v-container fluid class="main">
      <v-row>
        <v-col>
          <h1>eCoach</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p>
            La aplicación que te permitirá llevar a tus clientes al siguiente
            nivel
          </p>
          <p>¿Quieres probarlo?</p>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn color="#F9D56E" nuxt to="/login">
            Start Now
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'simple',
}
</script>

<style lang="scss" scoped>
.main {
  color: white;
  margin-top: 150px;
  h1 {
    font-size: 45px;
    font-weight: bold;
  }
}
</style>
