<template>
  <ion-page id="main-component">
    <ion-content>
      <MenuComponent />
      <ion-card class="profile-header">
        <div>
          <ion-avatar>
            <img alt="Silhouette of a person's head" :src="image" />
          </ion-avatar>
          <p>{{ user.userName }}</p>
        </div>
      </ion-card>
      <ion-card class="info-wrapper">
        <div class="edit-row">
          <ion-icon name="person-outline" size="large"></ion-icon>
          <ion-button fill="clear" @click="editInfo()">Edit</ion-button>
        </div>
        <div
          class="info-row"
          v-for="elem in information"
          v-bind:key="elem.label"
        >
          <p>{{ elem.label }}:</p>
          <p :class="{ hidden: editingInfo }">{{ elem.content }}</p>
          <ion-item :class="{ hidden: !editingInfo }">
            <ion-input :value="elem.content" v-model="elem.content"></ion-input>
          </ion-item>
        </div>
      </ion-card>
      <ion-card class="info-wrapper">
        <div class="edit-row">
          <ion-icon name="star-outline" size="large"></ion-icon>
          <ion-button fill="clear" @click="editPreferences()">Edit</ion-button>
        </div>
        <div
          class="info-row"
          v-for="elem in preferences"
          v-bind:key="elem.label"
        >
          <p>{{ elem.label }}:</p>
          <p :class="{ hidden: editingPreferences }">{{ elem.content }}</p>
          <ion-item :class="{ hidden: !editingPreferences }">
            <ion-input :value="elem.content" v-model="elem.content"></ion-input>
          </ion-item>
        </div>
      </ion-card>
      <div class="logout-button">
        <ion-button fill="clear" @click="logout()">Logout</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
  import {
    IonAvatar,
    IonCard,
    IonButton,
    IonIcon,
    IonContent,
    IonItem,
    IonInput,
    IonPage,
  } from "@ionic/vue";
  import { addIcons } from "ionicons";
  import { personOutline, starOutline } from "ionicons/icons";
  import { defineComponent } from "vue";
  import MenuComponent from "@/components/MenuComponent.vue";
  import { useRouter } from "vue-router";
  import { useFirestore } from "vuefire";
  import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    deleteDoc,
  } from "firebase/firestore";

  export default defineComponent({
    name: "UserProfile",
    components: {
      IonAvatar,
      IonCard,
      IonButton,
      IonIcon,
      IonContent,
      IonItem,
      IonInput,
      MenuComponent,
      IonPage,
    },

    data() {
      return {
        user: "",
        image: "https://ionicframework.com/docs/img/demos/avatar.svg",
        information: [
          {
            label: "Full Name",
            content: "",
          },
          {
            label: "Date of Birth",
            content: "Add date of birth",
          },
          {
            label: "Gender",
            content: "Add your gender",
          },
        ],
        preferences: [
          {
            label: "Favorite Libraries",
            content: "Add favourite libraries",
          },
          {
            label: "Favorite Genres",
            content: "Add favourite genres",
          },
        ],
        editingInfo: false,
        editingPreferences: false,
      };
    },
    setup() {
      const router = useRouter();

      const db = useFirestore();
      const loggedUser = collection(db, "loggedUser");

      return { db, loggedUser, router };
    },
    mounted() {
      getDocs(this.loggedUser).then((val) => {
        val.forEach((elem) => {
          let userRef = getDoc(doc(this.db, "user", elem.id));
          userRef.then((v) => {
            this.user = v.data();
            this.information[0].content = this.user.name;
            if (this.user.dateBirth != null) {
              this.information[1].content = this.user.dateBirth;
            }
            if (this.user.gender != null) {
              this.information[2].content = this.user.gender;
            }
            if (this.user.favLibraries != null) {
              this.preferences[0].content = this.user.favLibraries;
            }
            if (this.user.favGenres != null) {
              this.preferences[1].content = this.user.favGenres;
            }
          });
        });
      });
    },
    created() {
      addIcons({
        "person-outline": personOutline,
        "star-outline": starOutline,
      });
    },
    methods: {
      editInfo() {
        this.editingInfo = !this.editingInfo;
        if (this.editingInfo == false) {
          this.updateUser();
        }
      },
      editPreferences() {
        this.editingPreferences = !this.editingPreferences;
        if (this.editingPreferences == false) {
          this.updateUser();
        }
      },
      updateUser() {
        setDoc(doc(this.db, "user", this.user.userName), {
          userName: this.user.userName,
          pass: this.user.pass,
          name: this.information[0].content,
          dateBirth: this.information[1].content,
          gender: this.information[2].content,
          favLibraries: this.preferences[0].content,
          favGenres: this.preferences[1].content,
        });
      },
      logout() {
        deleteDoc(doc(this.db, "loggedUser", this.user.userName));
        this.router.push("/login");
      },
    },
  });
</script>

<style scoped>
  .hidden {
    display: none;
  }

  .profile-header {
    padding: 20px;
    margin: 10px 20px;
  }
  .profile-header div ion-avatar img {
    max-width: none;
    width: 64px;
    height: 64px;
  }

  .profile-header .button-wrapper {
    justify-content: flex-end;
  }

  .profile-header div {
    display: flex;
    column-gap: 20px;
  }

  .profile-header div p {
    color: black;
    font-size: 20px;
  }

  .profile-header div ion-item {
    font-size: 20px;
  }

  .info-wrapper {
    padding: 10px 20px 30px;
    margin: 10px 20px;
  }
  .info-wrapper .info-row {
    display: flex;
    align-items: center;
    column-gap: 10px;
    margin-bottom: 20px;
  }
  .info-wrapper .info-row p {
    margin: 0;
    min-width: 111px;
    color: black;
  }
  .info-wrapper .info-row:last-of-type {
    margin-bottom: 0;
  }
  .info-wrapper .info-row ion-input {
    font-size: 14px;
  }

  .info-wrapper .edit-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .info-wrapper .edit-row ion-icon {
    width: 25px;
    height: 25px;
  }
  .logout-button {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
</style>
