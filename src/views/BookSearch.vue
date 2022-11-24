<template>
  <ion-page id="main-component">
    <ion-content>
      <!-- <ToolbarComponent /> -->
      <div class="search-info">
        <h5>Showing results for "{{ result }}"</h5>
        <ion-button size="small" color="medium">
          <span>
            Filter
            <ion-icon name="options-outline" size="small"></ion-icon>
          </span>
        </ion-button>
      </div>
      <book-list :books="books" :readLists="readLists"></book-list>
    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from "vue";
  import { IonContent, IonPage, IonButton, IonIcon } from "@ionic/vue";
  import { addIcons } from "ionicons";
  import BookList from "@/components/BookList.vue";
  import { optionsOutline } from "ionicons/icons";
  //import ToolbarComponent from "@/components/Toolbar.vue";

  export default defineComponent({
    name: "BookSearch",
    components: {
      BookList,
      IonContent,
      IonPage,
      IonButton,
      IonIcon,
    },
    data() {
      return {
        result: "Clean Code",
        books: [
          { title: "Clean Code", author: "Goulão", image: "clean-code.jpg" },
          { title: "Clean Code", author: "Goulão", image: "clean-code.jpg" },
          { title: "Clean Code", author: "Goulão", image: "clean-code.jpg" },
          { title: "Clean Code", author: "Goulão", image: "clean-code.jpg" },
          { title: "Clean Code", author: "Goulão", image: "clean-code.jpg" },
        ],
        readLists: ["Fav Books", "Uni Books", "Future Reads"],
      };
    },
    created() {
      addIcons({
        "options-outline": optionsOutline,
      });
    },
  });
</script>
<style scoped>
  .search-info {
    display: flex;
    align-items: center;
    padding: 20px 10px;
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
