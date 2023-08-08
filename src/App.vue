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
      >
        <span class="mr-2">INICIO</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <iniciopage />
    </v-main>
  </v-app>
</template>

<script>
import iniciopage from './components/inicio.vue';

export default {
  name: 'App',

  components: {
    iniciopage,
  },

  data: () => ({
    //
  }),
};
</script>
