<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="cover">
        <!-- :src="require(`@/assets/${book.image}`)" -->
        <img src="@/assets/default-book.jpg" width="180" height="180" />
      </div>
      <div class="info">
        <strong>{{ book.title }}</strong>
        <p>
          <strong>Author: </strong>
          {{ book.author }}
        </p>
        <p>
          <strong>Publisher: </strong>
          {{ book.publisher }}
        </p>
        <p>
          <strong>Publish Date: </strong>
          {{ book.publishDate }}
        </p>
      </div>
      <div>
        <ion-button class="button" @click="() => setPath()">{{
          setButton()
        }}</ion-button>
      </div>
      <div class="synopse">
        <strong>Synopse</strong>
        <p>{{ synopse }}</p>
      </div>
      <div class="reviews">
        <strong>Reviews - {{getAvgScore()}}  <img :src="require('@/assets/star.png')" width="13" height="13" /></strong>
        <div class="review" v-for="review in reviews" :key="review.text">
          <strong> {{review.user }} <a>
            ( {{ review.score }}/10
            <img :src="require('@/assets/star.png')" width="13" height="13" />
            )</a></strong>

          <p>{{ review.text }}</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
  import { IonContent, IonPage, IonButton } from "@ionic/vue";
  import { defineComponent } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useFirestore } from "vuefire";
  import { getDoc, doc } from "firebase/firestore";

  export default defineComponent({
    name: "BookPage",
    components: {
      IonContent,
      IonPage,
      IonButton,
    },
    setup() {
      const router = useRouter();
      const route = useRoute();
      const { bookId } = route.params;

      const db = useFirestore();
      const bookRef = doc(db, "books", bookId);

      return {
        bookRef,
        router,
      };
    },
    mounted() {
      getDoc(this.bookRef).then((val) => {
        this.book = val.data();
        this.bookId = val.id;
        this.reviews = this.book.reviews
      });
    },
    
    data() {
      {
        return {
          book: "",
          bookId :"",
          synopse:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet velit velit. Curabitur nec massa vitae dui finibus luctus. Nunc a ex nec mauris lacinia iaculis sit amet sed orci. Morbi pulvinar porta urna non pulvinar. Cras at leo luctus, semper mi quis, congue ante. In hac habitasse platea dictumst. Phasellus euismod leo sit amet vulputate sagittis. Cras iaculis neque urna. Integer sollicitudin auctor turpis, a iaculis magna volutpat malesuada.",
          reviews: [],
          avgScore: 0,
        };
      }
    },
    methods: {
      setButton() {
        let status = this.book.status;
        if (status === "") {
          return "Reserve";
        } else if (status === "Picked Up") {
          return "Return";
        } else {
          return "QR Code";
        }
      },
      setPath() {
        let status = this.book.status;
        if (status === "") {
          this.router.replace({path:"/libraries/"+ this.bookId, query:{name: this.book.title}})
        } else if (status === "Picked Up") {
          this.router.push("/return");
        } else {
          this.router.push("/qrcode");
        }
      },

      getAvgScore(){
        this.avgScore = 0
        for(let i=0; i<this.reviews.length; i++){
          this.avgScore += this.reviews[i].score;
        }
        this.avgScore = this.avgScore/this.reviews.length
        return Math.round(this.avgScore * 10)/10
      }
    },
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
    align-items: baseline;

    top: 5px;
    left: 5px;

    width: 49%;
    float: left;
  }

  .title strong {
    font-size: 20px;
  }

  .synopse {
    position: relative;

    margin-top: 30px;
    margin-left: 10px;
    /* transform: translateY(-50%); */
  }

  .synopse strong {
    font-size: 20px;
    line-height: 26px;
  }

  .synopse p {
    font-size: 14px;

    color: 0.8c8c8c;

    margin: 0;
  }

  .synopse a {
    text-decoration: none;
  }

  .button {
    position: relative;

    left: 5%;
  }

  .info {
    margin-top: 10px;
    position: relative;
    left: 5px;
    right: 0;
    top: 5px;

    width: 49%;
    float: right;

    text-align: left;
    font-size: 14px;
  }

  .home_button {
    position: absolute;
    left: 5px;
    top: 5px;
  }

  .reviews {
    text-align: left;
    font-size: 13px;

    position: relative;
    margin-top: 20px;
    margin-left: 10px;

    align-self: left;
  }

  .reviews strong {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .review {
    position: relative;
    margin-top: 5px;
  }

  .review a {
    font-size: 14px;
    color: black;
  }
</style>
