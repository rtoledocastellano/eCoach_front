<template>
  <div>
    <v-container class="customerAvatar">
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
    <v-container class="PersonalInfo">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Datos Personales</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
              v-model="customer.email"
              :label="customer.email ? customer.email : 'Email'"
              :disabled="!modifyPersonalData"
              prepend-inner-icon="mdi-email"
            ></v-text-field>
            <v-text-field
              v-model="customer.telephone"
              :label="customer.telephone ? customer.telephone : 'Telefóno'"
              :disabled="!modifyPersonalData"
              prepend-inner-icon="mdi-phone"
            ></v-text-field>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  v-model="menu4"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Fecha de Nacimiento"
                      prepend-icon="mdi-calendar"
                      :disabled="!modifyPersonalData"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @input="menu4 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-select
              v-model="customer.goal"
              :label="customer.goal ? customer.goal : 'Introduzca Objetivo'"
              :disabled="!modifyPersonalData"
              :items="possibleGoals"
              prepend-inner-icon="mdi-bullseye-arrow"
            ></v-select>
            <div class="text-right">
              <v-btn
                v-if="!modifyPersonalData"
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
    <v-container class="AppointmentTable">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Control de Citas</v-expansion-panel-header>
          <v-expansion-panel-content>
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
    <v-container class="New Date">
      <v-row class="justify-right align-right">
        <div v-show="confirmationMessage">
          <h4>Su cita se ha guardado correctamente</h4>
        </div>
        <v-spacer></v-spacer>
        <v-btn color="#F9D56E" @click="showAppointment = !showAppointment"
          >Dar una Cita</v-btn
        >
      </v-row>
      <v-card v-if="showAppointment" class="mt-5">
        <v-card-title>
          Nueva Cita
        </v-card-title>
        <v-card-text>
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
                    label="Escoja su fecha"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  prepend-icon="alarm"
                  @input="menu2 = false"
                ></v-date-picker>
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
                    v-model="starts"
                    label="Hora de Inicio"
                    prepend-icon="mdi-alarm"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu3"
                  v-model="starts"
                  full-width
                  @click:minute="$refs.menu.save(time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-menu
                ref="menu"
                v-model="menu5"
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
                    v-model="finish"
                    label="Hora de Fin"
                    prepend-icon="mdi-alarm"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu5"
                  v-model="finish"
                  full-width
                  @click:minute="$refs.menu.save(time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-container>
              <v-row class="text-right">
                <v-col>
                  <v-btn color="#14B1AB" @click="confirmAppointment"
                    >Confirmar</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-container>
    <v-container class="EvolutionGraphs">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Ver Evolución</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card class="mt-4 mx-auto">
              <v-sheet class="v-sheet--offset mx-auto" elevation="5">
                <v-sparkline
                  :labels="labels"
                  :value="valueWeight"
                  color="#006064"
                  line-width="2"
                  padding="25"
                  label-size="4"
                ></v-sparkline>
                <v-card-text class="mt-2">
                  <div class="title font-weight-light mb-2">
                    Peso Corporal
                  </div>
                </v-card-text>
              </v-sheet>
            </v-card>
            <v-card class="mt-4 mx-auto">
              <v-sheet class="v-sheet--offset mx-auto" elevation="5">
                <v-sparkline
                  :labels="labels"
                  :value="valueFat"
                  color="#006064"
                  line-width="2"
                  padding="25"
                  label-size="4"
                ></v-sparkline>
                <v-card-text class="mt-2">
                  <div class="title font-weight-light mb-2">
                    Grasa Corporal
                  </div>
                </v-card-text>
              </v-sheet>
            </v-card>
            <v-card class="mt-4 mx-auto">
              <v-sheet class="v-sheet--offset mx-auto" elevation="5">
                <v-sparkline
                  :labels="labels"
                  :value="valueMuscle"
                  color="#006064"
                  line-width="2"
                  padding="25"
                  label-size="4"
                ></v-sparkline>
                <v-card-text class="mt-2">
                  <div class="title font-weight-light mb-2">
                    Músculo
                  </div>
                </v-card-text>
              </v-sheet>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const headers = { headers: { token: localStorage.getItem('token') } }
    const customerData = await $axios.get(`customers/${params.id}`, headers)
    const appointmentData = await $axios.get(
      `customers/${params.id}/appointment`,
      headers
    )
    return {
      customer: customerData.data[0],
      appointments: appointmentData.data.map((app) => ({
        ...app,
        date: app.date.substr(0, 10),
      })),
      labels: appointmentData.data.map((app) => app.date.substr(0, 10)),
      valueWeight: appointmentData.data.map((app) => app.weight),
      valueFat: appointmentData.data.map((app) => app.fat),
      valueMuscle: appointmentData.data.map((app) => app.muscle),
    }
  },
  data() {
    return {
      modifyPersonalData: false,
      showAppointment: false,
      confirmationMessage: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      time: null,
      menu4: false,
      menu5: false,
      starts: null,
      finish: null,
      menu3: false,
      modal2: false,
      possibleGoals: ['Perder Peso', 'Mantener Peso', 'Aumentar Masa'],
      headers: [
        {
          text: 'Fecha',
          align: 'start',
          sortable: false,
          value: 'date',
        },
        { text: 'Grasa (%)', value: 'fat', sortable: false },
        { text: 'Músculo (%)', value: 'muscle', sortable: false },
        { text: 'Agua (%)', value: 'water', sortable: false },
        { text: 'Peso (kg)', value: 'weight', sortable: false },
        { text: 'Editar', value: 'actions', sortable: false },
      ],
    }
  },
  methods: {
    updateCustomer() {
      this.$axios.post(
        `customers/${this.$route.params.id}`,
        {
          email: this.customer.email,
          telephone: this.customer.telephone,
          birthDate: this.date,
          goal: this.customer.goal,
        },
        {
          headers: { token: localStorage.getItem('token') },
        }
      )
      this.modifyPersonalData = !this.modifyPersonalData
    },
    confirmAppointment() {
      this.$axios.post(
        `customers/${this.$route.params.id}/appointment`,
        {
          customer: this.$route.params.id,
          date: this.date,
          starts: this.starts,
          finish: this.finish,
        },
        {
          headers: { token: localStorage.getItem('token') },
        }
      )
      this.showAppointment = !this.showAppointment
      this.confirmationMessage = !this.confirmationMessage
    },
    goToItem(item) {
      this.$router.push(`/appointments/${item._id}`)
    },
  },
}
</script>
