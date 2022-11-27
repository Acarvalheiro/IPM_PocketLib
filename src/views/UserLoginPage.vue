<template>
  <ion-page id="main_component">
    <ion-content :fullscreen="true">
      <div class="container" id="logoImage">
        <img class="image" :src="require('@/assets/PocketLib.png')" />
      </div>
      <div class="title">
        <strong>Welcome to PocketLib</strong>
      </div>
      <div>
        <div class="input">
          <ion-input placeholder="Username" v-model="userName"></ion-input>
        </div>
        <div class="input">
          <ion-input
            placeholder="Password"
            type="password"
            v-model="pass"
          ></ion-input>
        </div>
      </div>

      <div class="buttons">
        <ion-button @click="verifyUser()" class="log-in-button">
          Log in
        </ion-button>
        <ion-button
          class="create-acc-button"
          @click="() => router.push('/create')"
        >
          Create Account
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { IonContent, IonPage, IonInput, IonButton } from "@ionic/vue";
  import { defineComponent, computed } from "vue";
  import { useFirestore } from "vuefire";
  import { useCollection } from "vuefire";
  import { collection, getDoc, doc, setDoc } from "firebase/firestore";
  import { useRouter } from "vue-router";

  export default defineComponent({
    name: "LogInPage",
    components: {
      IonContent,
      IonPage,
      IonInput,
      IonButton,
    },

    data() {
      return {
        userName: "",
        pass: "",
      };
    },
    setup() {
      const router = useRouter();
      const image = computed(() => require("@/assets/PocketLib.png"));
      const db = useFirestore();
      const users = collection(db, "user");
      const loggedUser = collection(db, "loggedUser");
      const database = useCollection(collection(db, "books"));
      return { database, db, users, image, loggedUser, router };
    },

    methods: {
      verifyUser() {
        getDoc(doc(this.users, "/" + this.userName)).then((val) => {
          let user = val.data();
          if (user != undefined && user.pass == this.pass) {
            setDoc(doc(this.loggedUser, "/" + this.userName), {});
            this.router.push("/home");
          }
        });
      },
    },
  });
</script>

<style scoped>
  .container {
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }

  .container .image {
    display: block;

    margin-left: auto;
    margin-right: auto;
  }

  .title {
    margin-left: auto;
    margin-top: 10px;
    text-align: center;

    font-size: 20px;
  }

  .input {
    position: relative;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 80%;

    font-size: 16px;
    border: 1px solid black;
  }

  .buttons {
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }
  .buttons .create-acc-button {
    margin-left: 25px;
  }
</style>
