<template>
    <ion-page id="main-component">
        <ion-content>
            <!-- <ToolbarComponent /> -->
            <ion-card class="profile-header">
                <div class="button-wrapper">
                    <ion-button fill="clear" @click="editingUserName = !editingUserName">Edit</ion-button>
                </div>
                <div>
                    <ion-avatar>
                        <img alt="Silhouette of a person's head" :src="image" />
                    </ion-avatar>
                    <p :class="{hidden: editingUserName}">{{userName}}</p>
                    <ion-item :class="{hidden: !editingUserName}">
                        <ion-input :value="userName" v-model="userName"></ion-input>
                    </ion-item>
                </div>
            </ion-card>
            <ion-card class="info-wrapper">
                <div class="edit-row">
                    <ion-icon name="person-outline" size="large"></ion-icon>
                    <ion-button fill="clear" @click="editingInfo = !editingInfo">Edit</ion-button>
                </div>
                <div class="info-row" v-for="elem in information" v-bind:key="elem.label">
                    <p>{{elem.label}}:</p>
                    <p :class="{hidden: editingInfo}">{{elem.content}}</p>
                    <ion-item :class="{hidden: !editingInfo}">
                        <ion-input :value="elem.content" v-model="elem.content"></ion-input>
                    </ion-item>
                </div>
            </ion-card>
            <ion-card class="info-wrapper">
                <div class="edit-row">
                    <ion-icon name="star-outline" size="large"></ion-icon>
                    <ion-button fill="clear" @click="editingPreferences = !editingPreferences">Edit</ion-button>
                </div>
                <div class="info-row" v-for="elem in preferences" v-bind:key="elem.label">
                    <p>{{elem.label}}:</p>
                    <p :class="{hidden: editingPreferences}">{{elem.content}}</p>
                    <ion-item :class="{hidden: !editingPreferences}">
                        <ion-input :value="elem.content" v-model="elem.content"></ion-input>
                    </ion-item>
                </div>
            </ion-card>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
    import { IonAvatar, IonCard, IonButton, IonIcon, IonContent, IonItem, IonInput, IonPage } from '@ionic/vue';
    import { addIcons } from 'ionicons';
    import { personOutline, starOutline } from 'ionicons/icons';
    import { defineComponent } from 'vue';
    //import ToolbarComponent from '@/components/Toolbar.vue'
  
  export default defineComponent({
    name: 'UserProfile',
    components: {
        IonAvatar, 
        IonCard,
        IonButton,
        IonIcon,
        IonContent,
        IonItem,
        IonInput,
        //ToolbarComponent,
        IonPage
    },

    data() {
        return {
            userName: "Ambrosio123",
            image: "https://ionicframework.com/docs/img/demos/avatar.svg",
            information: [
                {
                    label: "Full Name",
                    content: "Ambrosio Maria Silva",
                },
                {
                    label: "Date of Birth",
                    content: "28/02/1996",
                },
                {
                    label: "Gender",
                    content: "Male",
                }
            ],
            preferences: [
                {
                    label: "Favorite Libraries",
                    content: "Alcantara, Amadora",
                },
                {
                    label: "Favorite Genres",
                    content: "Fantasy, Drama",
                }
            ],
            editingUserName: false,
            editingInfo: false,
            editingPreferences: false
        }
    },

    created() {
        addIcons({
        'person-outline': personOutline,
        'star-outline': starOutline
        });
    },
  });
</script>
  
<style scoped>
.hidden {
    display: none;
}

.profile-header {
    padding: 0px 20px 20px;
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
       
  </style>
  