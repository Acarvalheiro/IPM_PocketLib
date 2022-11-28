<template>
  <ion-page>
    <MenuComponent />
    <ion-content>
      <div class="book-main">
        <div class="cover" v-if="book.image !== undefined">
          <img :src="require(`@/assets/${book.image}`)">
        </div>
        <div class="info">
          <div class="info-text">
            <p class="title">{{ book.title }}</p>
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
          <ion-button class="button" @click="() => setPath()">{{
              setButton()
          }}</ion-button>
        </div>
      </div>

      <ion-card class="synopse-card">
        <div class="synopse">
          <h3>Synopse</h3>
          <p>{{ synopse }}</p>
        </div>
      </ion-card>
      <ion-card class="reviews-card">
        <div class="reviews">
          <div class="review-header">
            <h2>Reviews</h2>
            
          </div>
          <div class="review" v-for="review in reviews" :key="review.text">
            <div class="review-score">
              <ion-icon class="userIcon" name="person-circle-outline" color="medium"></ion-icon>
              <div class="user-score">
                <div class="user-info">
                  <h4> {{ review.user }} </h4>
                  <p>{{ review.date }}</p>
                </div>
                <ion-icon v-for="n in review.score" :key="n" name="star" color="warning"></ion-icon>
              </div>
            </div>
            <p>{{ review.text }}</p>
          </div>
        </div>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { addIcons } from "ionicons";
import { star, personCircleOutline } from "ionicons/icons";
import { IonContent, IonPage, IonButton, IonIcon, IonCard } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFirestore } from "vuefire";
import { getDoc, doc } from "firebase/firestore";
import MenuComponent from '@/components/MenuComponent.vue'

export default defineComponent({
  name: "BookPage",
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonIcon,
    IonCard,
    MenuComponent
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
      console.log(this.book)
      this.bookId = val.id;
    });
  },
  created() {
    addIcons({
      "star": star,
      "person-circle-outline": personCircleOutline
    });
  },

  data() {
    {
      return {
        book: "",
        bookId: "",
        synopse:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet velit velit. Curabitur nec massa vitae dui finibus luctus. Nunc a ex nec mauris lacinia iaculis sit amet sed orci. Morbi pulvinar porta urna non pulvinar. Cras at leo luctus, semper mi quis, congue ante. In hac habitasse platea dictumst. Phasellus euismod leo sit amet vulputate sagittis. Cras iaculis neque urna. Integer sollicitudin auctor turpis, a iaculis magna volutpat malesuada.",
        reviews: [{
          user: "João Maria",
          score: 5,
          date: "26/11/2022",
          text: "The sheer grandiosity of this book is unmeasurable, and yes, it is long, and yes, it drags at times, but that is to be expected since this is the first book in a long series (10 books)."
        },
        {
          user: "Maria João",
          score: 4,
          date: "03/10/2022",
          text: "Not here to review the book itself, just the edition. I quite like the delicate lettering however the pages are too thin making it harder to handle the book without being extra careful. Really cool illustrations also."
        },
        {
          user: "José João",
          score: 3,
          date: "13/08/2022",
          text: "Took a while for this book to hook me. But being a big fan of Sanderson’s work I stuck with it. The final third of the book certainly has me interested in reading book 2. All in all it was fine. Bit slow early and at times I wanted a bit more info that felt like I should have already known."
        }
        ],
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
        this.router.replace({ path: "/libraries/" + this.bookId, query: { name: this.book.title } })
      } else if (status === "Picked Up") {
        this.router.push("/return");
      } else {
        this.router.push("/qrcode");
      }
    },
  },
});
</script>

<style scoped>
.page_title {
  text-align: center;
  position: relative;
}

.book-main {
  display: flex;
  flex-direction: row;
  padding: 20px;
}

.book-main .cover {
  position: relative;
  align-items: baseline;
  width: 49%;
}


.book-main .cover img {
  width: 100%;
  box-shadow: 0px 12px 15px 5px rgba(0, 0, 0, .3);
}

.book-main .info {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  position: relative;
  text-align: left;
  font-size: 14px;
  padding-left: 20px;
}

.book-main .info .title {
  font-size: 30px;
  padding-bottom: 15px;
  margin: 0;
  font-weight: 700;
}

.book-main .info p {
  margin: 0 0 5px;
}

.synopse-card {
  margin: 20px 20px;
  color: black;
}

.synopse {
  text-align: justify;
  position: relative;
  padding: 15px;
}

.synopse h3 {
  font-size: 25px;
  font-weight: 600;
  line-height: 26px;
  padding-bottom: 15px;
  margin: 0;
}

.synopse p {
  font-size: 14px;
  margin: 0;
}

.synopse a {
  text-decoration: none;
  text-align: justify;
}

.button {
  margin: 0;
  margin-top: 25px;
  align-self: center;
  width: fit-content;

}

.reviews-card {
  margin: 20px 20px;
  color: black;
}

.reviews {
  padding: 0 15px;
  text-align: left;
  font-size: 13px;
}

.reviews .review-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
}

.reviews .review-header ion-icon {
  height: 25px;
  width: 25px;
  margin-right: 5px;
}

.reviews .review-header h2 {
  font-size: 25px;
  font-weight: 600;
  line-height: 26px;
  margin-bottom: 10px;
  margin: 0;
  padding-right: 15px;
}

.review {
  position: relative;
  padding: 10px 0 20px;
}


.review .review-score {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 10px;
}

.review .review-score .user-score {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.review .review-score .user-info {
  display: flex;
  flex-direction: column;
  align-self: baseline;
}

.review .review-score h4 {
  font-size: 20px;
  margin: 0;
  padding-right: 15px;
}

.review .review-score .userIcon {
  width: 35px;
  height: 35px;
  margin-right: 10px;
  align-self: center;
}

.review .review-score ion-icon {
  height: 20px;
  width: 20px;
  margin-right: 3px;
  align-self: flex-start;
}

.review p {
  margin: 0;
  text-align: justify;
}
</style>
