<template>
  <div>
    <v-container>
      <v-col cols="10" class="mt-10 mx-auto">
        <v-card>
          <v-card-title>
            Nuevo Cliente
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="customer.name"
                label="Nombre"
                :rules="nameRules"
                prepend-inner-icon="mdi-account"
              />
              <v-text-field
                v-model="customer.email"
                label="Email"
                :rules="emailRules"
                prepend-inner-icon="mdi-mail"
              />
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="customer.birthdate"
                    label="Fecha de Nacimiento"
                    prepend-inner-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="customer.birthdate"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
              <v-text-field
                v-model="customer.telephone"
                label="Telefono"
                prepend-inner-icon="mdi-phone"
              />
              <v-text-field
                v-model="customer.height"
                label="Estatura (cm)"
                prepend-inner-icon="mdi-human-male-height"
              />
              <v-select
                v-model="customer.goal"
                :label="customer.goal ? customer.goal : 'Introduzca Objetivo'"
                :items="possibleGoals"
                prepend-inner-icon="mdi-bullseye-arrow"
              ></v-select>
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
      customer: {
        name: '',
        email: '',
        birthdate: '',
        telephone: '',
        height: '',
        goal: '',
      },
      menu: false,
      possibleGoals: ['Perder Peso', 'Mantener Peso', 'Aumentar Masa'],
      nameRules: [
        (v) => !!v || 'Debe rellenar su nombre',
        (v) => (v && v.length >= 5) || 'El nombre debe tener al menos 4 letras',
      ],
      emailRules: [
        (v) => !!v || 'Se necesita email',
        (v) => /.+@.+\..+/.test(v) || 'Debe introducir un email válido',
      ],
    }
  },
  methods: {
    addCustomer() {
      return this.$axios.post(
        'customers/',
        {
          name: this.customer.name,
          email: this.customer.email,
          birthdate: this.customer.birthdate,
          telephone: this.customer.telephone,
          height: this.customer.height,
          goal: this.customer.goal,
        },
        { headers: { token: localStorage.getItem('token') } }
      )
    },
  },
}
</script>
