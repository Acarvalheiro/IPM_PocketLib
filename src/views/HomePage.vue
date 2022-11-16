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
    
      <div class="container">
        <strong>Ready to create an app?</strong>
        <p>Start with Ionic <router-link to="/book">BookPage {{decimal}}</router-link></p>
      </div>
      <div class="container">
        <SearchComponent/>
      </div>
      <div class="container" style="top: 75%;">
        <ion-button @click="increment">Increment</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonMenuButton, IonMenu } from '@ionic/vue';
import { defineComponent } from 'vue';
import MenuComponent from '@/components/MenuComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'

let num = 0;

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonMenuButton,
    MenuComponent,
    SearchComponent
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

</style>