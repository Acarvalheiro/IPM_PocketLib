<template>
  <ion-list>
    <ion-item>
      <ion-select interface="popover" placeholder="Your readbooks.." @IonChange="handleChange($event)">
        <IonSelectOption 
        v-for="list in readlists" 
        v-bind:key="list.id" 
        :title="list.listName" 
        :id="list.id"
        :value="list.id"
        >
          {{list.listName}}
        </IonSelectOption>
      </ion-select>
    </ion-item>
  </ion-list>
  <HorizBookList/>
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
      currentSelectedRl: ""
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
    handleChange(event, ) {
      console.log(event.target.value)
      console.log(event.target.value.id)
      this.currentSelectedRl= event.target.value
    }
  }


});

</script>