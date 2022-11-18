<template>
  <ion-menu content-id="main-component">
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-button @click="() => router.push('/home')" class="button-native">  
            Home
          </ion-button>
        </ion-item>
        <ion-item>
          <ion-button @click="() => router.push('/Profile')" class="button-native">  
            Profile
          </ion-button>
        </ion-item>
        <ion-item>
          <ion-button @click="() => router.push('/Books')" class="button-native">  
          Collections
          </ion-button>
        </ion-item>
        <ion-item>
          <ion-button @click="() => router.push('/home')" class="button-native">  
          Logout
          </ion-button>
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
      IonButton
    } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import { useRouter } from 'vue-router';

  
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
        IonButton
      },

    setup() {
      const router = useRouter();
      return { router };
    },
    });
</script>

<style scoped>

ion-button {
  --background: #ffffff;
  --background-hover: #266445;
  --background-activated: #88f4be;
  --background-focused: #88f4be;

  --color: black;

  --border-radius: 0;
  --border-color: #000;
  --border-style: solid;
  --border-width: 1px;

  --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);

  --padding-top: 10px;
  --padding-bottom: 10px;
}

.button-native {
  width: 294px;
}

</style>