<template>
  <v-layout>
    <v-container>
      <v-col cols="10" class="mt-10 mx-auto">
        <v-card>
          <v-card-title>
            <h1>Registro</h1>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="name"
                label="Nombre"
                prepend-icon="mdi-person"
              />
              <v-text-field
                v-model="email"
                label="Email"
                prepend-icon="mdi-mail"
              />
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                prepend-icon="mdi-lock"
                append-icon="mdi-eye-off"
                @click:append="showPassword = !showPassword"
              />
              <v-text-field
                v-model="passwordConfirmation"
                :type="showPasswordConf ? 'text' : 'password'"
                label="Repite tu contraseña"
                prepend-icon="mdi-lock"
                append-icon="mdi-eye-off"
                @click:append="showPassword = !showPassword"
              />
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#F9D56E" @click.prevent="signUp">Register</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="10" class="mt-10 mx-auto text-center">
        <h5>
          ¿Ya estás registrado?
        </h5>
        <v-btn nuxt to="/login">Login</v-btn>
      </v-col>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      showPassword: false,
      showPasswordConf: false,
    }
  },
  methods: {
    signUp() {
      return this.$axios
        .post('auth/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('name', response.data.name)
          localStorage.setItem('email', response.data.email)
          this.$router.go('/')
        })
    },
  },
}
</script>
