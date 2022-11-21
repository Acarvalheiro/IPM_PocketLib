<template>
    <ion-page id="main-component">
        <ion-content>
            <!-- <ToolbarComponent /> -->
            <div class="readlists-header">
                <h4 >Your Readlists</h4>
                <ion-icon name="add-outline" size="large" @click="onClick()"></ion-icon>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue'
import { IonContent, IonPage, IonIcon} from '@ionic/vue';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
//import ToolbarComponent from '@/components/Toolbar.vue'

export default defineComponent({
    name: "MyReadLists",
    components: { IonContent, IonPage, IonIcon },
    data() {
        return {
            readLists: ["Fav Books", "Uni Books", "Future Reads"],
        }
    },
    created() {
        addIcons({
            'add-outline': addOutline
        });
    },
    methods: {
        onClick(){
            console.log("Clicked")
        }
    }
})
</script>
<style scoped>
.readlists-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
}
    .readlists-header h4 {
        margin: 0;
    }
    .readlists-header ion-icon {
        color: gray;
    }
</style>
