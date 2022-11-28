<template>
  <ion-page id="main-component">
    <ion-content>
      <MenuComponent />
      <h2 class="list-title">{{ listName }}</h2>
      <book-list
        :books="books"
        :inList="true"
        @removeEvent="presentAlert"
      ></book-list>
    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from "vue";
  import { IonContent, IonPage, alertController } from "@ionic/vue";
  import BookList from "@/components/BookList.vue";
  import { useFirestore } from "vuefire";
  import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
  import { useRoute } from "vue-router";
  import MenuComponent from "@/components/MenuComponent.vue";

  export default defineComponent({
    name: "BooksInReadList",
    components: {
      BookList,
      IonContent,
      IonPage,
      MenuComponent,
    },
    data() {
      return {
        books: [],
        listName: "",
        db: "",
        list: "",
      };
    },
    methods: {
      getBooks() {
        this.list.then((val) => {
          let l = val.data();
          this.listName = l.listName;
          let booksInList = l.books;
          booksInList.forEach((bookId) => {
            let bookRef = getDoc(doc(this.db, "books", bookId));
            bookRef.then((v) => {
              let book = v.data();
              this.books.push({
                id: bookId,
                title: book.title,
                author: book.author,
                image: book.image,
              });
            });
          });
        });
      },
    },
    ionViewWillEnter() {
      this.presentAlert = async (title, id) => {
        const alert = await alertController.create({
          header: 'Remove "' + title + '"?',
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "Confirm",
              handler: () => {
                updateDoc(doc(this.db, "readlists", listId), {
                  books: arrayRemove(id),
                });
                document.getElementById(id).remove();
              },
            },
          ],
        });

        await alert.present();
      };
      const { listId } = this.route.params;

      this.db = useFirestore();
      this.list = getDoc(doc(this.db, "readlists", listId));
      this.books = [];
      this.getBooks();
    },
    setup() {
      const route = useRoute();
      return { route };
    },
  });
</script>
<style scoped>
  .list-title {
    margin: 0;
    padding: 20px;
  }
</style>
