<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
    
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
        to="/"
      >
        <span class="mr-2" >INICIO</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
//import iniciopage from './components/inicio.vue';

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
