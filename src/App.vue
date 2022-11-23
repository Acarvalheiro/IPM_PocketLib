<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});


</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
</style>