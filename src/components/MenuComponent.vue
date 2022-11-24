<template>
  <ion-menu side="start" content-id="main-component">
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
          <ion-button @click="() => router.push('/profile')" class="button-native">  
            Profile
          </ion-button>
        </ion-item>
        <ion-item>
          <ion-button @click="() => router.push('/myreadlists')" class="button-native">  
          Collections
          </ion-button>
        </ion-item>
        <ion-item>
          <ion-button @click="() => router.push('/reserved')" class="button-native">  
          Reserved Books
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


ion-icon {
  font-size: 50px;
}

</style>