<template>
  <ion-page id="main-component">
    <ion-content>
      <MenuComponent />
      <div class="reservation-type-wrapper">
        <h4>Your reservations</h4>
        <ion-list class="reservation-type">
          <ion-item>
            <ion-select
              interface="popover"
              placeholder="All"
              @ion-change="onChange($event)"
            >
              <ion-select-option
                v-for="elem in statusOptions"
                v-bind:key="elem"
                :value="elem"
              >
                {{ elem }}
              </ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
      </div>
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
  import {
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
  } from "@ionic/vue";
  import BookList from "@/components/BookList.vue";
  import { useFirestore, useCollection } from "vuefire";
  import { collection, doc, getDoc, getDocs } from "firebase/firestore";
  import MenuComponent from "@/components/MenuComponent.vue";

  export default defineComponent({
    name: "ReservedBooks",
    components: {
      BookList,
      IonContent,
      IonPage,
      IonList,
      IonItem,
      IonSelect,
      IonSelectOption,
      MenuComponent,
    },
    ionViewWillEnter() {
      this.db = useFirestore();
      this.reserved = collection(this.db, "reserved");
      this.readlists = useCollection(collection(this.db, "readlists"));
      this.books = []
      this.getBooks();
    },
    data() {
      return {
        db: '',
        reserved:'',
        readlists:'',
        books: [],
        statusOptions: ["All", "Picked Up", "Waiting Pick Up"],
        filterOption: "All",
      };
    },
    methods: {
      onChange(event) {
        this.filterOption = event.target.value;
        this.setShow();
      },
      setShow() {
        this.books.forEach((book) => {
          book.show =
            this.filterOption.toUpperCase() === book.status.toUpperCase() ||
            this.filterOption === "All";
        });
      },
      getBooks() {
        getDocs(this.reserved).then((val) => {
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
                status: book.status,
                show: true,
                date: "20/12/2022",
                library: library,
              });
            });
          });
        });
      },
    },
  });
</script>
<style scoped>
  .reservation-type-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
  }
  .reservation-type-wrapper h4 {
    margin: 0;
  }
  .reservation-type-wrapper .reservation-type {
    padding: 0;
  }
  .reservation-type-wrapper .reservation-type ion-item {
    --padding-start: 0;
  }
</style>
