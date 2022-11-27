<template>
  <ion-list>
    <ion-item>
      <ion-select interface="popover" placeholder="Your readbooks..">
        <IonSelectOption 
        v-for="list in readlists" 
        v-bind:key="list.id" 
        :title="list.listName" 
        :id="list.id"
        >
          <span @click="() => router.push('/profile')">
            {{list.listName}}
          </span>
        </IonSelectOption>
      </ion-select>
    </ion-item>
  </ion-list>
</template>
  
<script>
import { IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useFirestore, useCollection } from "vuefire";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'ReadListSelectorComp',
  components: {
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption
  },
  data() {
    return {
      newList: "",
      popoverOpen: false,
    };
  },
  setup() {
    const router = useRouter();
    const db = useFirestore();
    const listsRef = collection(db, "readlists");
    const readlists = useCollection(collection(db, "readlists"));

    return { router, readlists, listsRef, db };
  },


});

</script>