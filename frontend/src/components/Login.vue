<template>
<v-layout row justify-center>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Login</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Login</v-card-title>
      <div class="form">
        <v-text-field label="ID" required></v-text-field>
        <v-text-field label="Password" required></v-text-field>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark @click="">Login</v-btn>
        <v-btn color="green darken-1" flat @click="">Forgot password?</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-layout>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style>
.headline {
  padding-bottom: 50px;
}

.form {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
