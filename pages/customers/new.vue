<template>
  <div>
    <v-container>
      <v-col cols="10" class="mt-10 mx-auto">
        <v-card>
          <v-card-title>
            <h1>Nuevo Cliente</h1>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="name"
                label="Nombre"
                prepend-icon="mdi-user"
              />
              <v-text-field
                v-model="email"
                label="Email"
                prepend-icon="mdi-mail"
              />
              <v-text-field
                v-model="birthdate"
                label="Fecha de Nacimiento"
                prepend-icon="mdi-event"
              />
              <v-text-field
                v-model="telephone"
                label="Telefono"
                prepend-icon="mdi-event"
              />
              <v-text-field
                v-model="height"
                label="Estatura (cm)"
                prepend-icon="mdi-event"
              />
              <v-text-field
                v-model="goal"
                label="Objetivo"
                prepend-icon="mdi-event"
              />
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#F9D56E" @click.prevent="addCustomer"
                >Añadir Cliente</v-btn
              >
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      birthdate: '',
      telephone: '',
      height: '',
      goal: '',
    }
  },
  methods: {
    addCustomer() {
      return this.$axios.post(
        'customers/',
        {
          name: this.name,
          email: this.email,
        },
        { headers: { token: localStorage.getItem('token') } }
      )
    },
  },
}
</script>
