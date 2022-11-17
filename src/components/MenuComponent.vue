<template>
  <ion-menu content-id="main-component">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-icon name="home" slot="start"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-item>
        <ion-item >
          <ion-icon name="person" slot="start"></ion-icon>
          <router-link to="/profile"><ion-label>Profile</ion-label></router-link>
        </ion-item>
        <ion-item>
          <ion-icon name="chatbubbles" slot="start"></ion-icon>
          <ion-label>Collections</ion-label>
        </ion-item>
        <ion-item>
          <ion-icon name="settings" slot="start"></ion-icon>
          <ion-label>Logout</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>
  
<script lang="ts">
    import {
      IonContent,
      IonHeader,
      IonMenu,
      IonTitle,
      IonToolbar,
      IonList,
      IonItem,
      IonIcon,
      IonLabel
    } from '@ionic/vue';
    import { defineComponent } from 'vue';
  
    export default defineComponent({
      name: 'MenuComponent',
      components: {
        IonContent,
        IonHeader,
        IonMenu,
        IonTitle,
        IonToolbar,
        IonList,
        IonItem,
        IonIcon,
        IonLabel
      },
    });
</script>