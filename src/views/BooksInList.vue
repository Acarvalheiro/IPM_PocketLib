<template>
    <ion-page id="main-component">
        <ion-content>
            <!-- <ToolbarComponent /> -->
            <h2 class="list-title">{{listTitle}}</h2>
            <book-list :books="books" :inList="true" @removeEvent="presentAlert"></book-list>
        </ion-content>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue'
import { IonContent, IonPage, alertController } from '@ionic/vue';
import BookList from '@/components/BookList.vue'
//import ToolbarComponent from '@/components/Toolbar.vue'

export default defineComponent({
    name: "BooksInReadList",
    components: { BookList, IonContent, IonPage },
    data() {
        return {
            listTitle: "Fav Books",
            books:
                [
                    {title: "Clean Code", author: "Goulão", image: "clean-code.jpg"},
                    {title: "Bad Code", author: "Goulão", image: "clean-code.jpg"},
                    {title: "Mid Code", author: "Goulão", image: "clean-code.jpg"},
                    {title: "Advanced Assembly", author: "Goulão", image: "clean-code.jpg"},
                ]
        }
    },
    setup() {
      const presentAlert = async (title) => {
        const alert = await alertController.create({
          header: 'Remove "' + title + '"?',
          buttons: [
            {
                text: 'Cancel',
                role: 'cancel',
            },
            {
                text: 'Confirm',
                handler: () => {
                    document.getElementById(title).remove();
                }
            }
        ],
        });

        await alert.present();
      };

      return { presentAlert };
    },
})
</script>
<style scoped>
.list-title {
    margin: 0;
    padding: 20px 10px;
}
</style>
