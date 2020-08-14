<template>
  <div>
    <v-container class="customerAvatar">
      <v-col>
        <v-row class="justify-center align-center">
          <v-avatar color="white">
            <v-icon color="black" @click="goToCustomer"
              >mdi-account-circle</v-icon
            >
          </v-avatar>
        </v-row>
        <v-row class="justify-center align-center">
          <div class="mt-3" @click="goToCustomer">
            <h2>
              {{ appointment.customer.name }}
            </h2>
          </div>
        </v-row>
      </v-col>
    </v-container>
    <v-card>
      <v-card-title
        >Control Fecha: {{ appointment.date.substr(0, 10) }}</v-card-title
      >
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="appointment.weight"
              label="Peso (kg)"
              :disabled="edit"
              prepend-inner-icon="mdi-weight-kilogram"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="appointment.muscle"
              label="Músculo(%)"
              :disabled="edit"
              :rules="numberRules"
              prepend-inner-icon="mdi-dumbbell"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="appointment.fat"
              label="Grasa(%)"
              :disabled="edit"
              :rules="numberRules"
              prepend-inner-icon="mdi-water-off"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="appointment.water"
              label="Agua(%)"
              :disabled="edit"
              :rules="numberRules"
              prepend-inner-icon="mdi-water"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col>
            <v-textarea
              v-model="appointment.diet"
              name="Dieta"
              filled
              label="Dieta"
              auto-grow
              :value="appointment.diet"
              :disabled="edit"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              v-model="appointment.training"
              name="Entrenamiento"
              filled
              label="Entrenamiento"
              auto-grow
              :value="appointment.training"
              :disabled="edit"
            >
            </v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row class="text-right">
          <v-col>
            <v-btn v-if="edit" color="#F9D56E" @click="edit = !edit"
              >Editar</v-btn
            >
            <v-btn v-else color="#F9D56E" @click.prevent="updateAppointment"
              >Guardar</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const headers = { headers: { token: localStorage.getItem('token') } }
    const appointmentData = await $axios.get(
      `appointments/${params.id}`,
      headers
    )
    return {
      appointment: appointmentData.data,
    }
  },
  data() {
    return {
      edit: true,
      numberRules: [
        (v) =>
          /.+../.test(v) ||
          'Los decimales deben ser insertados por puntos (41.3)',
      ],
    }
  },
  methods: {
    updateAppointment() {
      this.$axios.post(
        `appointments/${this.$route.params.id}`,
        {
          weight: this.appointment.weight,
          muscle: this.appointment.muscle,
          water: this.appointment.water,
          fat: this.appointment.fat,
          diet: this.appointment.diet,
          training: this.appointment.training,
        },
        {
          headers: { token: localStorage.getItem('token') },
        }
      )
      this.edit = !this.edit
    },
    goToCustomer() {
      this.$router.push(`/customers/${this.appointment.customer._id}`)
    },
  },
}
</script>
