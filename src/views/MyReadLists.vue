<template>
  <ion-page id="main-component">
    <ion-content>
      <MenuComponent />
      <div class="readlists-header">
        <h4>Your Readlists</h4>
        <ion-icon
          name="add-outline"
          size="large"
          @click="popoverOpen = true"
        ></ion-icon>
        <ion-popover
          class="create-popover"
          :is-open="popoverOpen"
          @didDismiss="onDismiss()"
        >
          <h4>Create Readlist</h4>
          <ion-item>
            <ion-input
              placeholder="Readlist Title"
              @ion-change="newList = $event.target.value"
            ></ion-input>
          </ion-item>
          <div class="button-wrapper">
            <ion-button fill="clear" @click="addList()">Add</ion-button>
            <ion-button fill="clear" @click="popoverOpen = false"
              >Back</ion-button
            >
          </div>
        </ion-popover>
      </div>
      <read-list-info
        v-for="list in readlists"
        v-bind:key="list.id"
        :title="list.listName"
        :id="list.id"
        @removeEvent="presentRemoveAlert"
      >
      </read-list-info>
    </ion-content>
  </ion-page>
</template>

<script>
  import { defineComponent } from "vue";
  import {
    IonContent,
    IonPage,
    IonIcon,
    alertController,
    IonPopover,
    IonItem,
    IonInput,
    IonButton,
  } from "@ionic/vue";
  import { addIcons } from "ionicons";
  import { addOutline } from "ionicons/icons";
  import ReadListInfo from "@/components/ReadListInfo.vue";
  import { useFirestore, useCollection } from "vuefire";
  import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
  import MenuComponent from "@/components/MenuComponent.vue";

  export default defineComponent({
    name: "MyReadLists",
    components: {
      IonContent,
      IonPage,
      IonIcon,
      ReadListInfo,
      IonPopover,
      IonItem,
      IonInput,
      IonButton,
      MenuComponent,
    },
    data() {
      return {
        newList: "",
        popoverOpen: false,
      };
    },
    created() {
      addIcons({
        "add-outline": addOutline,
      });
    },
    setup() {
      const presentRemoveAlert = async (title, id) => {
        const alert = await alertController.create({
          header: 'Remove "' + title + '"?',
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "Confirm",
              handler: () => {
                deleteDoc(doc(db, "readlists", id));
                document.getElementById(id).remove();
              },
            },
          ],
        });

        await alert.present();
      };

      const db = useFirestore();
      const listsRef = collection(db, "readlists");
      const readlists = useCollection(collection(db, "readlists"));

      return { presentRemoveAlert, readlists, listsRef, db };
    },
    methods: {
      onDismiss() {
        this.newList = "";
        this.popoverOpen = false;
      },
      addList() {
        if (this.newList != "") {
          addDoc(this.listsRef, {
            listName: this.newList,
            books: [],
          });
          this.popoverOpen = false;
        }
      },
    },
  });
</script>
<style scoped>
  .readlists-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
  .readlists-header h4 {
    margin: 0;
  }
  .readlists-header ion-icon {
    color: gray;
  }

  .create-popover h4 {
    padding-left: 15px;
  }
  .create-popover .button-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    padding-right: 5px;
    padding-bottom: 5px;
  }

  .create-popover::part(content) {
    top: 55px;
    right: 10px;
    left: auto;
  }
</style>
