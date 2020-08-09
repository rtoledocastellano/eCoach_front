<template>
  <div>
    <h2>Control Fecha: {{ appointment.date }}</h2>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="appointment.weight"
            label="Peso (kg)"
            :disabled="edit"
            prepend-inner-icon="mdi-email"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="appointment.muscle"
            label="Músculo(%)"
            :disabled="edit"
            prepend-inner-icon="mdi-email"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="appointment.fat"
            label="Grasa(%)"
            :disabled="edit"
            prepend-inner-icon="mdi-user"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="appointment.water"
            label="Agua(%)"
            :disabled="edit"
            prepend-inner-icon="mdi-user"
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
      <v-row class="justify-right align-right">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      appointment: {},
      edit: true,
    }
  },
  created() {
    this.$axios
      .get(`appointments/${this.$route.params.id}`, {
        headers: { token: localStorage.getItem('token') },
      })
      .then((response) => (this.appointment = response.data))
  },
  methods: {
    updateAppointment() {
      console.log(this.$route.params.id)
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
  },
}
</script>
