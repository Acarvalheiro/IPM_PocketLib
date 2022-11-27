<template>
  <ion-page id="main-component">
    <ion-content>
      <!-- <ToolbarComponent /> -->
      <h4 class="notifications-title">Your Notifications</h4>
      <book-list
        :books="books"
        :readLists="readlists"
        :reserved="true"
      ></book-list>
    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from "vue";
  import { IonContent, IonPage } from "@ionic/vue";
  import BookList from "@/components/BookList.vue";
  import { useFirestore, useCollection } from "vuefire";
  import { collection, doc, getDoc, getDocs } from "firebase/firestore";
  //import ToolbarComponent from '@/components/Toolbar.vue'

  export default defineComponent({
    name: "NotificationsPage",
    components: {
      BookList,
      IonContent,
      IonPage,
    },
    data() {
      return {
        books: [],
      };
    },
    methods: {
      getBooks() {
        getDocs(this.notifications).then((val) => {
          val.forEach((elem) => {
            let bookRef = getDoc(doc(this.db, "books", elem.id));
            let library = elem.data().library;
            bookRef.then((v) => {
              let book = v.data();
              this.books.push({
                id: v.id,
                title: book.title,
                author: book.author,
                image: book.image,
                library: library,
              });
            });
          });
        });
      },
    },
    setup() {
      const db = useFirestore();
      const notifications = collection(db, "notifications");
      const readlists = useCollection(collection(db, "readlists"));
      return { notifications, readlists, db };
    },
    mounted() {
      this.getBooks();
    },
  });
</script>
<style scoped>
  .notifications-title {
    margin: 0;
    padding: 20px 10px;
  }
</style>
