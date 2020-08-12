<template>
  <v-layout>
    <v-container>
      <v-col cols="10" class="mt-2 mx-auto">
        <v-card>
          <v-card-title>
            <h3>Registro</h3>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="name"
                label="Nombre"
                prepend-icon="mdi-account"
                :rules="nameRules"
              />
              <v-text-field
                v-model="email"
                label="Email"
                prepend-icon="mdi-mail"
                :rules="emailRules"
              />
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                prepend-icon="mdi-lock"
                append-icon="mdi-eye-off"
                :rules="passwordRules"
                @click:append="showPassword = !showPassword"
              />
              <v-text-field
                v-model="passwordConfirmation"
                :type="showPasswordConf ? 'text' : 'password'"
                label="Repite tu contraseña"
                prepend-icon="mdi-lock"
                append-icon="mdi-eye-off"
                :rules="passwordConfirmationRule"
                @click:append="showPassword = !showPassword"
              />
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#F9D56E" @click.prevent="signUp">
                <v-icon>mdi-account-plus</v-icon>
                Registrarme</v-btn
              >
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="10" class="mt-10 mx-auto text-center">
        <h5>
          ¿Ya estás registrado?
        </h5>
        <v-btn color="#2196F3" class="mt-5" nuxt to="/login">
          <v-icon>mdi-login</v-icon> Login</v-btn
        >
      </v-col>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  layout: 'simple',

  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      showPassword: false,
      showPasswordConf: false,
      nameRules: [
        (v) => !!v || 'Debe rellenar su nombre',
        (v) => (v && v.length >= 5) || 'El nombre debe tener al menos 4 letras',
      ],
      emailRules: [
        (v) => !!v || 'Se necesita email',
        (v) => /.+@.+\..+/.test(v) || 'Debe introducir un email válido',
      ],
      passwordRules: [
        (v) => !!v || 'La contraseña es obligatoria',
        (v) =>
          (v && v.length >= 8) ||
          'Debe introducir al menos 8 caracteres. Un símbolo y una mayúscula',
      ],
      passwordConfirmationRule: [
        (v) => !!v || 'Por favor, confirme su contraseña',
      ],
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
          this.$router.push('/calendar')
        })
    },
  },
}
</script>
