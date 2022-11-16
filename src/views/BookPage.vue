<template>
  <ion-page>
    <ion-header :translucent="false">
      <ion-toolbar>
        <ion-button class="home_button">Home</ion-button>
        <ion-title class="page_title">Blank</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div class="title">
        <strong>{{title}}</strong>
      </div>
      <div class="info">
        <p><strong>Author: </strong> <br> {{author}}</p>
        <p><strong>Publisher: </strong> <br> {{publisher}}</p>
        <p><strong>Publish Date: </strong> <br> {{publish_date}}</p>
      </div>
      <div class="button">
        <ion-button>Reserve</ion-button>
      </div>
      <div class="synopse">
        <p>{{synopse}}</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import axios from 'axios';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BookPage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton
  },
  data() {{
    return {
      title: 'Peace of seats',
      author: 'George',
      publisher: 'Porcelain',
      isbn: '',
      publish_date: 'February 2069',
      synopse: 'parody, in literature, an imitation of the style and manner of a particular writer or school of writers. Parody is typically negative in intent',
      reviews: [],
    }
  }},

  mounted() {
    //axios
    //  .get(/*some api here, that transmits the data*/)
  }


});
</script>

<style scoped>
.page_title {
  text-align: center;
  position: relative;
}
.title {
  text-align: center;
  
  position: absolute;
  left: 60%;
  top: 9%;

  font-size: 14px;
}
.synopse {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.synopse strong {
  font-size: 20px;
  line-height: 26px;
}

.synopse p {
  font-size: 14px;
  line-height: 22px;
  
  color: .8c8c8c;
  
  margin: 0;
}

.synopse a {
  text-decoration: none;
}

.button {
  position: absolute;
  left: 60%;
  right: auto;
  top: 30%;
}

.info {
  position: absolute;
  left: 60%;
  right: 0;
  top: 10%;

  font-size: 14px;
}

.home_button{
  position: absolute;
  left: 5px;
  top: 5px;

}
</style>