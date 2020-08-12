<template>
  <div>
    <v-card color="#006064">
      <v-tabs background-color="#006064" centered dark icons-and-text>
        <v-tabs-slider></v-tabs-slider>

        <v-tab @click="showTable = !showTable">
          Tabla
          <v-icon>mdi-table</v-icon>
        </v-tab>

        <v-tab @click="showTable = !showTable">
          Calendario
          <v-icon>mdi-calendar</v-icon>
        </v-tab>
      </v-tabs>
    </v-card>
    <v-card v-show="showTable" class="mt-10">
      <v-card-title>
        Mis Citas
      </v-card-title>
      <v-row>
        <v-col cols="12" sm="6" md="2">
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
              :first-day-of-week="1"
              locale="es"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-data-table :headers="headers" :items="appointments" :search="date"
        ><template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="goToUser(item)">
            mdi-account
          </v-icon>
          <v-icon small class="mr-2" @click="goToItem(item)">
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-card v-show="!showTable" class="mt-10">
      <v-card-title>
        Mi Calendario
      </v-card-title>
      <v-row>
        <v-col>
          <v-sheet height="400">
            <v-calendar
              ref="calendar"
              :events="events"
              color="primary"
              type="week"
            ></v-calendar>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const headers = { headers: { token: localStorage.getItem('token') } }
    const appointmentData = await $axios.get(`appointments/`, headers)
    return {
      appointments: appointmentData.data.map((app) => ({
        ...app,
        date: app.date.substr(0, 10),
      })),
      events: appointmentData.data.map((app) => ({
        name: app.customer.name,
        start: `${app.date.substr(0, 10)} ${app.starts}`,
        end: `${app.date.substr(0, 10)} ${app.finish}`,
      })),
    }
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      items: [],
      menu2: false,
      showTable: true,
      headers: [
        {
          text: 'Date',
          align: 'start',
          sortable: false,
          value: 'date',
        },
        { text: 'Inicio', value: 'starts', sortable: false },
        { text: 'Cliente', value: 'customer.name', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  mounted() {
    this.$refs.calendar.scrollToTime('08:00')
  },
  methods: {
    goToItem(item) {
      this.$router.push(`/appointments/${item._id}`)
    },
    goToUser(item) {
      this.$router.push(`/customers/${item.customer._id}`)
    },
  },
}
</script>
