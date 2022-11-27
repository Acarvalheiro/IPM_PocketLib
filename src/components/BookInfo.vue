<template>
  <div :id="id" class="book-info-wrapper" v-show="show">
    <img
      :src="require(`@/assets/${image}`)"
      alt="image"
      @click="() => router.push('/book/' + id)"
    />
    <div class="text-wrapper">
      <h3 @click="() => router.push('/book/' + id)">{{ title }}</h3>
      <p class="author" @click="() => router.push('/book/' + id)">
        {{ author }}
      </p>
      <ion-list class="add-dropdown" v-show="!inList">
        <ion-item>
          <ion-select
            interface="popover"
            placeholder="Add to readlist"
            :selected-text="addedTo"
            :multiple="true"
            @ion-change="onChange($event)"
          >
            <ion-select-option
              v-for="elem in readLists"
              v-bind:key="elem.id"
              :value="elem.id"
            >
              {{ elem.listName }}
            </ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <ion-button
        size="small"
        color="danger"
        v-show="inList"
        @click="$emit('removeEvent')"
      >
        <span>
          Remove
          <ion-icon name="close-outline" size="small"></ion-icon>
        </span>
      </ion-button>
      <p
        class="status"
        :class="[pickedUp() ? 'green' : 'yellow']"
        v-if="reserved"
      >
        {{ status }}
      </p>
      <p class="library" v-if="reserved">{{ library }}</p>
      <p class="date" v-if="reserved && pickedUp() && status != null">
        Return before {{ date }}
      </p>
      <p class="date" v-if="reserved && !pickedUp() && status != null">
        Pick up before {{ date }}
      </p>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from "vue";
  import {
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
  } from "@ionic/vue";
  import { addIcons } from "ionicons";
  import { closeOutline } from "ionicons/icons";
  import { useRouter } from "vue-router";
  import { useFirestore } from "vuefire";
  import { collection, doc, arrayUnion, updateDoc } from "firebase/firestore";

  export default defineComponent({
    name: "BookInfo",
    components: {
      IonList,
      IonItem,
      IonSelect,
      IonSelectOption,
      IonButton,
      IonIcon,
    },
    props: {
      id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      readLists: {
        type: Array,
        required: false,
      },
      inList: {
        type: Boolean,
        required: false,
        default: false,
      },
      show: {
        type: Boolean,
        required: false,
        default: true,
      },
      reserved: {
        type: Boolean,
        required: false,
        default: false,
      },
      status: {
        type: String,
        required: false,
      },
      date: {
        type: String,
        required: false,
      },
      library: {
        type: String,
        required: false,
      },
    },
    data() {
      return {
        addedTo: "",
      };
    },
    created() {
      addIcons({
        "close-outline": closeOutline,
      });
    },
    setup() {
      const router = useRouter();

      const db = useFirestore();
      const readlistsRef = collection(db, "readlists");

      return { router, db, readlistsRef };
    },
    emits: ["removeEvent"],
    methods: {
      onChange(event) {
        let value = event.target.value;
        if (value == 0) {
          this.addedTo = "";
        } else {
          let listId = value[0];
          updateDoc(doc(this.readlistsRef, listId), {
            books: arrayUnion(this.id),
          });
          this.addedTo = "Added to readlist";
        }
      },
      pickedUp() {
        if (this.status != null) {
          return this.status == "Picked Up";
        }
      },
    },
  });
</script>

<style scoped>
  .book-info-wrapper {
    display: flex;
    column-gap: 20px;
    width: 100%;
    padding: 15px 10px;
  }
  .book-info-wrapper img {
    width: 40%;
  }
  .book-info-wrapper .text-wrapper h3 {
    margin-bottom: 5px;
  }
  .book-info-wrapper .text-wrapper .author {
    margin-top: 0;
    margin-bottom: 0;
  }
  .book-info-wrapper .text-wrapper .status {
    font-size: 13px;
    margin-top: 20px;
    margin-bottom: 5px;
  }
  .book-info-wrapper .text-wrapper .status.green {
    color: green;
  }
  .book-info-wrapper .text-wrapper .status.yellow {
    color: rgb(237, 217, 0);
  }
  .book-info-wrapper .text-wrapper .date {
    font-size: 11px;
    margin: 0;
  }
  .book-info-wrapper .text-wrapper .library {
    font-size: 11px;
    margin: 0;
    margin-bottom: 5px;
  }
  .book-info-wrapper .text-wrapper .add-dropdown {
    padding: 0;
    margin-top: 10px;
  }
  .book-info-wrapper .text-wrapper .add-dropdown ion-item {
    --padding-start: 0;
  }
  .book-info-wrapper .text-wrapper ion-button {
    margin-top: 25px;
  }
  .book-info-wrapper .text-wrapper ion-button span {
    display: flex;
    column-gap: 5px;
    align-items: center;
  }
</style>
