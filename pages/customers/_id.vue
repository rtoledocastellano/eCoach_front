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
      <div v-if="showAppointment">
        <v-row>
          <h4>Nueva Cita</h4>
        </v-row>
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
                  prepend-icon="mdi-access_time"
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
                  prepend-icon="mdi-access_time"
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
        <v-row class="justify-right align-right">
          <v-spacer></v-spacer>
          <v-btn color="#14B1AB" @click="confirmAppointment">Confirmar</v-btn>
        </v-row>
      </div>
    </v-container>
    <v-container class="PersonalInfo">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Ver Evolución</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card class="mx-auto text-center" color="gray">
              <v-card-text>
                <v-sheet color="rgba(0, 0, 0, .12)">
                  <v-sparkline
                    :value="value"
                    color="primary"
                    height="100"
                    padding="24"
                    stroke-linecap="round"
                    smooth
                  >
                    <template v-slot:label="item">
                      {{ item.value }}kg
                    </template>
                  </v-sparkline>
                </v-sheet>
              </v-card-text>

              <v-card-text>
                <div class="font-weight-bold">Peso Corporal</div>
              </v-card-text>
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
      menu4: false,
      menu5: false,
      starts: null,
      finish: null,
      menu3: false,
      modal2: false,
      items: [10, 20, 30],
      value: [81.3, 82.4, 83.5],
      possibleGoals: ['Perder Peso', 'Mantener Peso', 'Aumentar Masa'],
      headers: [
        {
          text: 'Fecha',
          align: 'start',
          sortable: false,
          value: 'date',
        },
        { text: 'Grasa (%)', value: 'fat' },
        { text: 'Músculo (%)', value: 'muscle' },
        { text: 'Agua (%)', value: 'water' },
        { text: 'Peso (kg)', value: 'weight' },
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
