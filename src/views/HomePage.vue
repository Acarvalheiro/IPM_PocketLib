<template>

  <MenuComponent/>

  <ion-page id="main-component">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="logoImage"> 
        <img :src="require('@/assets/PocketLib.png')" >
      </div>

      <div class="container">
        <SearchComponent/>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonMenu } from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import MenuComponent from '@/components/MenuComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import { setupConfig } from '@ionic/core';

let num = 0;

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    MenuComponent,
    SearchComponent
  },

  setup() {
    const image = computed(() => require('@/assets/PocketLib.png'))
    return {
      image,
    }
  },

  data() {{
    return {
      decimal: num,
    }
  }},

  methods: {
    increment(){
      this.decimal++;
    }
  }

});
</script>

<style scoped>
.container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}


.container strong {
  font-size: 20px;
  line-height: 26px;
}

.container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

.container a {
  text-decoration: none;
}

#counter {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 75%;
  transform: translateY(-50%);
}

#counter strong {
  font-size: 20px;
  line-height: 26px;
}

#logoImage {
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  text-align: center;
}

</style>