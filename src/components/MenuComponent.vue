<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <div class="header">
        <div class="left-toolbar">
          <ion-buttons slot="start">
            <ion-icon @click="toggleMenu()" :icon="isOpen ?  arrowBackCircleOutline : menu" ></ion-icon>
          </ion-buttons>
        </div>
        <img slot="center" @click="router.push('/home')" src="@/assets/PocketLibCut.png">
        <div @click="() => router.push('/profile')" class="right-toolbar">
          <ion-icon :icon="person"></ion-icon>
        </div>
      </div>
    </ion-toolbar>
  </ion-header>
  <div class="menu" :class="[isOpen ? 'open':'']">
    <div class="menu-content">
      <ion-list>
        <ion-item>
          <ion-button @click="router.push('/home'), isOpen=false ">
            Home
          </ion-button>
        </ion-item>
        <ion-item>
          <ion-button @click="router.push('/profile'), isOpen=false">
            Profile
          </ion-button>
        </ion-item>
        <ion-item>
          <ion-button @click="router.push('/myreadlists'), isOpen=false">
            Collections
          </ion-button>
        </ion-item>
        <ion-item>
          <ion-button @click="router.push('/reserved'), isOpen=false" class="button-native">
            Reserved Books
          </ion-button>
        </ion-item>
      </ion-list>
    </div>
  </div>
</template>
  
<script lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonList,
  IonItem,
  IonButton,
  IonIcon
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { person, menu, arrowBackCircleOutline } from "ionicons/icons"



export default defineComponent({
  name: 'MenuComponent',
  components: {
    IonHeader,
    IonToolbar,
    IonList,
    IonItem,
    IonButton,
    IonIcon,
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleMenu(){
      this.isOpen = !this.isOpen
    }
    
  },
  setup() {
  const router = useRouter();
  return { router, person , menu, arrowBackCircleOutline};
},
});
</script>

<style scoped>

ion-icon{
  height: 35px;
  width: 35px;
}
.header{
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
}

.header img{
  height: 40px;
  width: 55px;
}
.menu {
  position: fixed;
  background-color: rgba(0, 0, 0, 0);
  top: 56px;
  right: 100vw;
  width: 100%;
  height: 100%;
  z-index: 10;
  transition: right ease 200ms, background-color ease 2s;
}
.menu.open{
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.menu .menu-content {
  background-color: white;
  width: 40%;
  height: 100%;
}
</style>