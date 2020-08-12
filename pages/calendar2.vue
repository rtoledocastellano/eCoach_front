<template>
  <div>
    <v-card>
      <v-tabs
        v-model="tab"
        background-color="deep-purple accent-4"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          Recents
          <v-icon>mdi-phone</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          Favorites
          <v-icon>mdi-heart</v-icon>
        </v-tab>

        <v-tab href="#tab-3">
          Nearby
          <v-icon>mdi-account-box</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i">
          <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-card v-show="showTable" class="mt-10">
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
              :now="today"
              :value="today"
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
    }
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      items: [],
      tab: null,
      menu2: false,
      showTable: true,
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
