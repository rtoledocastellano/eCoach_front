<template>
  <v-card class="mx-auto mt-10 mb-10" max-width="344" @click="seeAppointment">
    <v-card-text>
      <div>Id: {{ appointment._id }}</div>
      <p class="display-1 text--primary">
        {{ appointment.date }}
      </p>
      <div class="text--primary">
        weight: {{ appointment.weight }}<br />
        fat: {{ appointment.fat }}<br />
        muscle: {{ appointment.muscle }}<br />
        water:
        {{ appointment.water }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    appointment: Object,
  },
  methods: {
    seeAppointment() {
      this.$router.push(`/appointments/${this.appointment._id}`)
    },
  },
}
</script>
