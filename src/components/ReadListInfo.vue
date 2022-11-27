<template>
  <div class="list-info-wrapper" :id="id">
    <img
      class="thumbnail"
      @click="() => router.push('/readlist/' + id)"
      :src="require(`@/assets/${thumbnail}`)"
      alt="image"
    />
    <div class="text-wrapper">
      <h3 @click="() => router.push('/readlist/' + id)">{{ title }}</h3>
      <ion-button
        size="small"
        color="danger"
        @click="$emit('removeEvent', title, id)"
      >
        <span>
          Remove
          <ion-icon name="close-outline" size="small"></ion-icon>
        </span>
      </ion-button>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from "vue";
  import { IonButton, IonIcon } from "@ionic/vue";
  import { addIcons } from "ionicons";
  import { closeOutline } from "ionicons/icons";
  import { useRouter } from "vue-router";
  import { useFirestore } from "vuefire";
  import { doc, getDoc } from "firebase/firestore";

  export default defineComponent({
    name: "BookInfo",
    components: { IonButton, IonIcon },
    props: {
      title: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        thumbnail: "default-book.jpg",
      };
    },
    created() {
      addIcons({
        "close-outline": closeOutline,
      });
    },
    setup(props) {
      const router = useRouter();

      const db = useFirestore();
      const list = getDoc(doc(db, "readlists", props.id));

      return { router, db, list };
    },
    mounted() {
      this.setThumbnail();
    },
    methods: {
      setThumbnail() {
        this.list.then((val) => {
          let l = val.data();
          let booksInList = l.books;
          if (booksInList.length != 0) {
            let bookId = booksInList[0];
            let bookRef = getDoc(doc(this.db, "books", bookId));
            bookRef.then((v) => {
              let book = v.data();
              this.thumbnail = book.image;
            });
          }
        });
      },
    },
    emits: ["removeEvent"],
  });
</script>

<style scoped>
  .list-info-wrapper {
    display: flex;
    column-gap: 20px;
    width: 100%;
    padding: 15px 10px;
  }
  .list-info-wrapper img {
    width: 40%;
  }
  .list-info-wrapper .text-wrapper h3 {
    margin-bottom: 5px;
  }
  .list-info-wrapper .text-wrapper p {
    margin-top: 0;
    margin-bottom: 0;
  }

  .list-info-wrapper .text-wrapper ion-button {
    margin-top: 25px;
  }
  .list-info-wrapper .text-wrapper ion-button span {
    display: flex;
    column-gap: 5px;
    align-items: center;
  }
</style>
