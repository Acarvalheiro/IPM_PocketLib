<template>
  <ion-page id="main_component">
    <ion-content :fullscreen="true">
      <div class="form">
        <div class="title">
          <strong>Please insert your information below</strong>
        </div>
        <div class="input">
          <ion-label class="label">Name</ion-label>
          <ion-input placeholder="Name" v-model="name"></ion-input>
        </div>
        <div class="input">
          <ion-label class="label">Username</ion-label>
          <ion-input placeholder="Username" v-model="userName"></ion-input>
        </div>
        <div class="input">
          <ion-label class="label">Password</ion-label>
          <ion-input
            type="password"
            placeholder="Password"
            v-model="pass"
          ></ion-input>
        </div>

        <ion-button @click="postUser()">Create Account</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import router from "@/router";
  import {
    IonContent,
    IonPage,
    IonInput,
    IonButton,
    IonLabel,
  } from "@ionic/vue";
  import { defineComponent, computed } from "vue";
  import { useFirestore } from "vuefire";
  import { useCollection } from "vuefire";
  import { collection, setDoc, doc } from "firebase/firestore";

  export default defineComponent({
    name: "CreateAccountPage",
    components: {
      IonContent,
      IonPage,
      IonInput,
      IonButton,
      IonLabel,
    },
    setup() {
      const image = computed(() => require("@/assets/PocketLib.png"));
      const db = useFirestore();
      const users = collection(db, "user");
      const loggedUser = collection(db, "loggedUser");
      const database = useCollection(collection(db, "books"));
      return { database, db, users, image, loggedUser };
    },

    data() {
      return {
        name: "",
        userName: "",
        pass: "",
      };
    },

    methods: {
      postUser() {
        console.log("adding...");
        setDoc(doc(this.users, "/" + this.userName), {
          userName: this.userName,
          name: this.name,
          pass: this.pass,
        });
        setDoc(doc(this.loggedUser, "/" + this.userName), {});
        router.push("/home");
      },
    },
  });
</script>

<style scoped>
  .title {
    margin-left: auto;
    margin-top: 10px;
    text-align: center;
    margin-bottom: 30px;

    font-size: 20px;
  }

  .form {
    margin-top: 10%;
    margin-left: auto;
    margin-right: auto;

    width: 80%;
  }

  .form .label {
    display: inline-block;
    padding-top: 5px;
    padding-left: 5px;
  }

  .form .input {
    margin-top: 15px;

    border: 1px solid black;
  }

  .form .button {
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;

    width: 50vw;
    height: 6vw;

    font-size: 4vw;
  }
</style>
