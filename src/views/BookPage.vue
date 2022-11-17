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
    
      <div class="cover">
        <img src="../download.jpeg" width="180" height="180">
      </div>
        <div class="info">
          <strong>{{title}}</strong>
          <p><strong>Author: </strong> <br> {{author}}</p>
          <p><strong>Publisher: </strong> <br> {{publisher}}</p>
          <p><strong>Publish Date: </strong> <br> {{publish_date}}</p>
          <ion-button class="button">Reserve</ion-button>
        </div>
      <div class="synopse">
        <p>{{synopse}}</p>
      </div>
      <div class="review">
        <strong>Reviews</strong>
        <div v-for="review in reviews" :key="review" >
            {{review.text}}
        </div>
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
      reviews: [
        {
          text: "book was very good. pls read",
        },
      ],
    }
  }},

  // mounted() {
  //   axios
  //     .get(some api here, that transmits the data)
  // }


});
</script>

<style scoped>
.page_title {
  text-align: center;
  position: relative;
}
.title {
  text-align: center;
  font-size: 40px;
  
  position: relative;
  left: 10px;
  top: 10px;

  font-size: 14px;
}

.cover {
  position: relative;
  align-items:baseline;

  top: 5px;
  left: 5px;

  width: 49%;
  float: left;
}

.title strong{
  font-size: 20px;
}
.synopse {
  text-align: left;
  
  position: relative;
  left: 0;
  right: 0;
  top: 10px;
  /* transform: translateY(-50%); */
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
  position: relative;
}

.info {
  margin-top: 10px;
  position: relative;
  left: 5px;
  right: 0;
  top: 5px;

  width:49%;
  float: right;

  text-align: left;
  font-size: 14px;
}

.home_button{
  position: absolute;
  left: 5px;
  top: 5px;

}

.review{
  
  text-align: center;
  font-size: 13px;

  position:absolute;
  top: 50%;
  align-self:center;
}
</style>