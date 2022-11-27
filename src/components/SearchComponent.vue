<template>

  <ion-searchbar inputmode="text"  @ionInput="handleChange($event)" placeholder="Search books" value=""></ion-searchbar>
  <ion-list style="width: 75%; z-index: 999;" v-if="canIShow">
    <ion-item v-for="result in results" :key=result.title>
      <ion-label @click="() => router.push('/book/' + result.id)">
        <p style="text-align:left;">
          {{ result.title }}
          <span style="float:right;">
            <img class="imgSearchBook" :src="require('@/assets/' + result.image)">
          </span>
        </p>
        {{ result.author }}
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script>
import { IonItem, IonList, IonSearchbar, IonLabel, IonInput } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useFirestore } from "vuefire";
import { collection, query, where, getDocs, doc, getDoc, forEach } from "firebase/firestore";
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { IonItem, IonList, IonSearchbar, IonLabel },

  setup() {

    const router = useRouter();
    const results = ref([{ title: "", author: "", image: "" }]);
    const db = useFirestore();
    const booksDB = collection(db, 'books')

    return {router, booksDB, db, results };
  },

  data() {
    let canIShow = false;
    return {
      canIShow,
      books: [],
      listName: "",
    }
  },

  methods: {
    handleChange(event) {
      const query = event.target.value.toLowerCase();
      this.canIShow = true;
      this.results = this.books.filter((book) => {
        return (book.title.toLowerCase().indexOf(query) > -1 && query != "");
      })
    },
  },
  mounted() {
    getDocs(this.booksDB).then((val) =>  {
      val.forEach(element =>  {
        console.log(element.data());
        let book = element.data();
              this.books.push({
                id: book.id,
                title: book.title,
                author: book.author,
                image: book.image,
              });
      })
    });
  }
});

</script>

<style>
.searchResultsStyle {
  border-style: ridge;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  width: 75%;
}

.imgSearchBook {
    width: 40px;
    height: 55px;
} 
</style>
