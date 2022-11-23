<template>
    <ion-page id="main-component">
        <ion-content>
            <!-- <ToolbarComponent /> -->
            <div class="reservation-type-wrapper">
                <h4>Your reservations</h4>
                <ion-list class="reservation-type">
                    <ion-item>
                        <ion-select interface="popover" placeholder="All" @ion-change="onChange($event)">
                            <ion-select-option v-for="elem in statusOptions" v-bind:key="elem" :value="elem">
                                {{elem}}
                            </ion-select-option>
                        </ion-select>
                    </ion-item>
                </ion-list>
            </div>
            <book-list :books="books" :readLists="readLists"></book-list>
        </ion-content>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue'
import { IonContent, IonPage, IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/vue';
import BookList from '@/components/BookList.vue'
//import ToolbarComponent from '@/components/Toolbar.vue'

export default defineComponent({
    name: "ReservedBooks",
    components: { BookList, IonContent, IonPage, IonList, IonItem, IonSelect, IonSelectOption },
    data() {
        return {
            books:
                [
                    {title: "Clean Code", author: "Goulão", image: "clean-code.jpg", status: "Picked Up", show: true},
                    {title: "Clean Code", author: "Goulão", image: "clean-code.jpg", status: "Picked Up", show: true},
                    {title: "Bad Code", author: "Goulão", image: "clean-code.jpg", status: "Waiting Pick Up", show: true},
                    {title: "Mid Code", author: "Goulão", image: "clean-code.jpg", status: "Waiting Pick Up", show: true},
                    {title: "Clean Code", author: "Goulão", image: "clean-code.jpg", status: "Picked Up", show: true}
                ],
            readLists: ["Fav Books", "Uni Books", "Future Reads"],
            statusOptions: ["All", "Picked Up", "Waiting Pick Up"],
            filterOption: "All"
        }
    },
    methods: {
        onChange(event){
            this.filterOption = event.target.value;
            this.setShow(); 
        },
        setShow(){
            this.books.forEach(book => {
                book.show = this.filterOption.toUpperCase() === book.status.toUpperCase() || this.filterOption === "All";
            });
        }
    }
})
</script>
<style scoped>
    .reservation-type-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 10px;
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
