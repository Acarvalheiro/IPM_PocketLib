<template>
  <ion-page id="main-component">
    <MenuComponent />
    <ion-content :fullscreen="true">
      <div class="container">
        <img :src="require('@/assets/PocketLib.png')">
        <div style="position:relative">
          <SearchComponent />
        </div>
        <ReadListSelectorComp />
      </div>
      <HorizBookList :title="'Trending'" :books="trending"></HorizBookList>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent, computed, ref } from 'vue';
import SearchComponent from '@/components/SearchComponent.vue'
import MenuComponent from '@/components/MenuComponent.vue'
import ReadListSelectorComp from '@/components/ReadListSelector.vue'
import HorizBookList from '@/components/HorizBookList.vue'
import { useFirestore } from "vuefire";
import { collection, query, where, getDocs, doc, getDoc, forEach } from "firebase/firestore";
import { useRouter } from 'vue-router';

let num = 0;

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
    SearchComponent,
    MenuComponent,
    ReadListSelectorComp,
    HorizBookList
  },

  setup() {
    const image = computed(() => require('@/assets/PocketLib.png'))
    const router = useRouter();
    const results = ref([{ title: "", author: "", image: "" }]);
    const db = useFirestore();
    const trendingDB = collection(db, 'trending')
    const booksDB = collection(db, 'books')

    return { router, trendingDB, booksDB, db, results, image };
  },

  data() {
    let canIShow = false;
    let title = "";
    let trending = [];
    return { title, canIShow, trending }
  },
  mounted() {
    getDocs(this.trendingDB).then((val) => {
      val.forEach(element => {
        let bookRef = getDoc(doc(this.db, "books", element.id));
        bookRef.then((v) => {
          let book = v.data();
          this.trending.push({
            id: v.id,
            title: book.title,
            image: book.image,
          })
        });
      })
    })
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.container strong {
  font-size: 20px;
  line-height: 26px;
}

.container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

.container a {
  text-decoration: none;
}

#counter {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 75%;
  transform: translateY(-50%);
}

#counter strong {
  font-size: 20px;
  line-height: 26px;
}

#logoImage {
  position: absolute;
  left: 0;
  right: 0;
}

.wrapper {
  position: relative;
  width: auto;
  height: 200px;
}

.container1 {
  position: absolute;
  right: 0;
  left: 0;
}

.container2 {
  position: absolute;
  left: 170px;
  width: fit-content;
}

.container3 {
  position: absolute;
  left: -60px;
  top: 130%;
}
</style>