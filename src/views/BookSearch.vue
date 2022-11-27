<template>
  <ion-page id="main-component">
    <ion-content>
      <MenuComponent />
      <ToolbarComponent />
      <div class="search-info">
        <h5>Showing results for "{{ input }}"</h5>
        <ion-button size="small" color="medium">
          <span>
            Filter
            <ion-icon name="options-outline" size="small"></ion-icon>
          </span>
        </ion-button>
      </div>
      <book-list :books="books" :readLists="readlists"></book-list>
    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from "vue";
  import { IonContent, IonPage, IonButton, IonIcon } from "@ionic/vue";
  import { addIcons } from "ionicons";
  import BookList from "@/components/BookList.vue";
  import { optionsOutline } from "ionicons/icons";
  import { useFirestore, useCollection } from "vuefire";
  import { collection, getDocs, query, where } from "firebase/firestore";
  import { useRoute } from "vue-router";
  import ToolbarComponent from "@/components/Toolbar.vue";
  import MenuComponent from "@/components/MenuComponent.vue";

  export default defineComponent({
    name: "BookSearch",
    components: {
      BookList,
      IonContent,
      IonPage,
      IonButton,
      IonIcon,
      ToolbarComponent,
      MenuComponent,
    },
    data() {
      return {
        result: "Result",
        books: [],
      };
    },
    created() {
      addIcons({
        "options-outline": optionsOutline,
      });
    },
    setup() {
      const route = useRoute();
      const { input } = route.params;

      const db = useFirestore();
      const readlists = useCollection(collection(db, "readlists"));

      const booksRef = collection(db, "books");
      const titleQuery = query(booksRef, where("title", "==", input));
      const authorQuery = query(booksRef, where("author", "==", input));
      const publisherQuery = query(booksRef, where("publisher", "==", input));

      return { readlists, titleQuery, authorQuery, publisherQuery, input };
    },
    mounted() {
      this.getResults();
    },
    methods: {
      getResults() {
        let titleDocs = getDocs(this.titleQuery);
        let authorDocs = getDocs(this.authorQuery);
        let publisherDocs = getDocs(this.publisherQuery);
        titleDocs.then((val) => {
          val.forEach((v) => {
            let book = v.data();
            this.books.push({
              id: v.id,
              title: book.title,
              author: book.author,
              image: book.image,
            });
          });
        });
        authorDocs.then((val) => {
          val.forEach((v) => {
            let book = v.data();
            this.books.push({
              id: v.id,
              title: book.title,
              author: book.author,
              image: book.image,
            });
          });
        });
        publisherDocs.then((val) => {
          val.forEach((v) => {
            let book = v.data();
            this.books.push({
              id: v.id,
              title: book.title,
              author: book.author,
              image: book.image,
            });
          });
        });
      },
    },
  });
</script>
<style scoped>
  .search-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 15px;
    padding: 20px;
  }
  .search-info h5 {
    margin: 0;
  }
  .search-info ion-button span {
    display: flex;
    column-gap: 5px;
    align-items: center;
    padding: 5px;
  }
</style>
