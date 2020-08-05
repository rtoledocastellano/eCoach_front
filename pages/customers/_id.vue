<template>
  <v-app>
    {{ appointments }}
    <v-container>
      <v-col>
        <v-row class="justify-center align-center">
          <v-avatar color="white">
            <v-icon color="black">mdi-account-circle</v-icon>
          </v-avatar>
        </v-row>
        <v-row class="justify-center align-center">
          <h2 class="mt-3">{{ customer.name }}</h2>
        </v-row>
      </v-col>
    </v-container>
    <v-container>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Datos Personales</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
              v-model="email"
              :label="customer.email ? customer.email : 'Email'"
              :disabled="modifyPersonalData"
              prepend-inner-icon="mdi-email"
            ></v-text-field>
            <v-text-field
              v-model="tlf"
              :label="customer.telephone ? customer.telephone : 'Telefóno'"
              :disabled="modifyPersonalData"
              prepend-inner-icon="mdi-email"
            ></v-text-field>
            <v-text-field
              v-model="birthDate"
              :label="
                customer.birthDate ? customer.birthDate : 'Fecha de Nacimiento'
              "
              :disabled="modifyPersonalData"
              prepend-inner-icon="mdi-user"
            ></v-text-field>
            <v-text-field
              v-model="goal"
              :label="customer.goal ? customer.goal : 'Introduzca Objetivo'"
              :disabled="modifyPersonalData"
              prepend-inner-icon="mdi-user"
            ></v-text-field>
            <div class="justify-right">
              <v-btn
                v-if="modifyPersonalData"
                color="#F9D56E"
                @click="modifyPersonalData = !modifyPersonalData"
                >Editar</v-btn
              >
              <v-btn v-else color="#F9D56E" @click.prevent="updateCustomer"
                >Guardar</v-btn
              >
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
    <v-container>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Control de Citas</v-expansion-panel-header>
          <v-expansion-panel-content>
            <AppointmentCard
              v-for="(appointment, idx) in appointments"
              :key="idx"
              :appointment="appointment"
            />
            <v-data-table
              :headers="headers"
              :items="appointments"
              :sort-by="['Date']"
              :sort-desc="[false, true]"
              multi-sort
              class="elevation-1"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="goToItem(item)">
                  mdi-pencil
                </v-icon>
              </template></v-data-table
            >
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
    <v-container>
      <v-row class="justify-right align-right">
        <v-spacer></v-spacer>
        <v-btn color="#F9D56E" @click="showAppointment = !showAppointment"
          >Dar una Cita</v-btn
        >
      </v-row>
      <div v-if="showAppointment">
        <v-row>
          <h4>Nueva Cita</h4>
        </v-row>
        <v-row>
          <v-col>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Cita"
                  prepend-icon="mdi-event"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-menu
              ref="menu"
              v-model="menu3"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
                  label="Seleccione la Hora"
                  prepend-icon="mdi-access_time"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu3"
                v-model="time"
                full-width
                @click:minute="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-select :items="items" label="Duración" solo></v-select>
          </v-col>
        </v-row>
        <v-row class="justify-right align-right">
          <v-spacer></v-spacer>
          <v-btn color="#14B1AB" @click="confirmAppointment">Confirmar</v-btn>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import AppointmentCard from '@/components/apointment-card'

export default {
  components: {
    AppointmentCard,
  },
  data() {
    return {
      email: '',
      tlf: '',
      birthDate: '',
      modifyPersonalData: true,
      customer: {},
      appointments: [],
      showAppointment: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      time: null,
      menu3: false,
      modal2: false,
      items: [10, 20, 30],
      headers: [
        {
          text: 'Date',
          align: 'start',
          sortable: false,
          value: 'date',
        },
        { text: 'Fat (%)', value: 'fat' },
        { text: 'Muscle (%)', value: 'muscle' },
        { text: 'Water (%)', value: 'water' },
        { text: 'Weight (kg)', value: 'weight' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  created() {
    this.$axios
      .get(`customers/${this.$route.params.id}`, {
        headers: { token: localStorage.getItem('token') },
      })
      .then((response) => (this.customer = response.data[0]))
  },
  mounted() {
    this.$axios
      .get(`customers/${this.$route.params.id}/appointment`, {
        headers: { token: localStorage.getItem('token') },
      })
      .then((response) => (this.appointments = response.data))
  },
  methods: {
    updateCustomer() {
      this.$axios
        .post(
          `customers/${this.$route.params.id}`,
          {
            email: this.email,
            telephone: this.tlf,
          },
          {
            headers: { token: localStorage.getItem('token') },
          }
        )
        .then((response) => (this.customer = response.data[0]))
      this.$router.push(`/customers/${this.$route.params.id}`)
    },
    confirmAppointment() {
      this.$axios
        .post(
          `customers/${this.$route.params.id}/appointment`,
          {
            customer: this.$route.params.id,
            date: this.date,
          },
          {
            headers: { token: localStorage.getItem('token') },
          }
        )
        .then((response) => (this.customer = response.data[0]))
      this.$router.push(`/customers/${this.$route.params.id}`)
    },
    goToItem(item) {
      this.$router.push(`/appointments/${item._id}`)
    },
  },
}
</script>
