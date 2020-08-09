<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-img
              src="https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png?1509471214"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <h1>Bienvenido a e-coach</h1>
        <p>
          La aplicación que te permitirá llevar a tus clientes al siguiente
          nivel
        </p>
        <p>¿Quieres probarlo?</p>
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
    </v-flex>
  </v-layout>
</template>
