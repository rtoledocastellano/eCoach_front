<template>
  <div>
    <v-card>
      <v-card-title>
        Mis Citas
        <v-spacer></v-spacer>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Fecha"
                  prepend-icon="mdi-event"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="appointments"
        :search="date"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const headers = { headers: { token: localStorage.getItem('token') } }
    const appointmentData = await $axios.get(`appointments/`, headers)
    console.table(appointmentData)
    return {
      appointments: appointmentData.data.map((app) => ({
        ...app,
        date: app.date.substr(0, 10),
      })),
    }
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      items: [],
      menu2: false,
      headers: [
        {
          text: 'Date',
          align: 'start',
          sortable: false,
          value: 'date',
        },
        { text: 'Inicio', value: 'starts' },
        { text: 'Cliente', value: 'customer.name' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  methods: {
    myFilter(value, query) {
      console.log(value, query)
      return true
    },
  },
}
</script>
