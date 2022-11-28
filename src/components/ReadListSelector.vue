<template>
  <ion-list>
    <ion-item>
      <ion-select
        interface="popover"
        placeholder="Your readbooks.."
        @IonChange="handleChange($event)"
      >
        <IonSelectOption
          v-for="list in readlists"
          v-bind:key="list.id"
          :id="list.id"
          :value="list.id"
        >
          {{ list.listName }}
        </IonSelectOption>
      </ion-select>
    </ion-item>
  </ion-list>
  <div class="list-wrapper" v-if="selected">
    <HorizBookList :title="currentSelectedRl" :books="books"></HorizBookList>
  </div>
</template>

<script>
  import { IonList, IonItem, IonSelect, IonSelectOption } from "@ionic/vue";
  import { defineComponent } from "vue";
  import { useFirestore, useCollection } from "vuefire";
  import { collection, getDoc, doc } from "firebase/firestore";
  import { useRouter } from "vue-router";
  import HorizBookList from "@/components/HorizBookList.vue";

  export default defineComponent({
    name: "ReadListSelectorComp",
    components: {
      IonList,
      IonItem,
      IonSelect,
      IonSelectOption,
      HorizBookList,
    },
    data() {
      return {
        books: [],
        popoverOpen: false,
        currentSelectedRl: "",
        selected: false,
      };
    },
    setup() {
      const router = useRouter();
      const db = useFirestore();
      const listsRef = collection(db, "readlists");
      const readlists = useCollection(collection(db, "readlists"));

      return { router, readlists, listsRef, db };
    },
    methods: {
      handleChange(event) {
        this.selected = true;
        this.books = [];
        let listId = event.target.value;
        getDoc(doc(this.db, "readlists", listId)).then((val) => {
          let list = val.data();
          this.currentSelectedRl = list.listName;
          list.books.forEach((bookId) => {
            getDoc(doc(this.db, "books", bookId)).then((v) => {
              let book = v.data();
              this.books.push({
                id: v.id,
                title: book.title,
                image: book.image,
              });
            });
          });
        });
      },
    },
  });
</script>
<style scoped>
  .list-wrapper {
    width: 100%;
  }
</style>
