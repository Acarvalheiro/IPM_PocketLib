<template>

  <ion-searchbar inputmode="text" @ionInput="handleChange($event)" placeholder="Search books" value=""></ion-searchbar>

  <ion-list>
    <ion-item v-for="result in results" :key=result.title>
      <ion-label>
        <p>{{ result.title }}</p>
        {{ result.title }} {{ result.author }}
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
import { IonItem, IonList, IonSearchbar, IonLabel, IonInput } from '@ionic/vue';
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    components: { IonItem, IonList, IonSearchbar, IonLabel },

    setup() {
      const books = [{title: "Clean Code1", author: "Goulão", image: "clean-code.jpg"},
                    {title: "A", author: "Goulão", image: "clean-code.jpg"},
                    {title: "Clean Code3", author: "Goulão", image: "clean-code.jpg"}];

      const results = ref([{title: "", author: "", image: ""}]);

      
      return { books, results };
    },


    methods: {
      handleChange(event) {
        const query = event.target.value.toLowerCase();

        this.results = this.books.filter((book) => {
          return (book.title.toLowerCase().indexOf(query) > -1 && query != "");
        })
      },
    },
  });
</script>
