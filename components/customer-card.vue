<template>
  <v-card @click="seeCustomer">
    <v-card-text>
      <div>
        <v-icon>mdi-email</v-icon>
        {{ customer.email }} ||
        <br />
        <v-icon>
          mdi-phone
        </v-icon>
        {{ customer.telephone }}
      </div>
      <p class="display-1 text--primary">
        {{ customer.name }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="#263238">
        Ver Cliente
      </v-btn>
    </v-card-actions>
  </v-card>
  <!-- <v-card-text>
      <div>Word of the Day</div>
      <p class="display-1 text--primary">
        be•nev•o•lent
      </p>
      <p>adjective</p>
      <div class="text--primary">
        well meaning and kindly.<br>
        "a benevolent smile"
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Learn More
      </v-btn>
    </v-card-actions>
  </v-card> -->
</template>

<script>
export default {
  props: {
    customer: {
      type: Object,
      required: true,
    },
  },
  methods: {
    seeCustomer() {
      this.$router.push(`/customers/${this.customer._id}`)
    },
  },
}
</script>
