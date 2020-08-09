<template>
  <v-layout>
    <v-container>
      <v-col cols="10" class="mt-10 mx-auto">
        <v-card>
          <v-card-title>
            <h3>Login</h3>
          </v-card-title>
          <v-card-text>
            <v-form>
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
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#F9D56E" @click.prevent="loginFunction">
                <v-icon>mdi-login</v-icon>
                Login</v-btn
              >
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="10" class="mt-10 mx-auto text-center">
        <h5>
          ¿Aún no estás registrado? Haz click aquí
        </h5>
        <v-btn class="mt-5" nuxt-link to="/signup">Registrate</v-btn>
      </v-col>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    }
  },
  methods: {
    loginFunction() {
      return this.$axios
        .post('auth/login', { email: this.email, password: this.password })
        .then((response) => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('name', response.data.name)
          localStorage.setItem('email', response.data.email)
          this.$router.push('/customers')
        })
    },
  },
}
</script>
