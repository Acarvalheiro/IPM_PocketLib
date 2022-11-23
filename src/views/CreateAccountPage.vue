<template>
    <ion-page id="main_component">
        <ion-content :fullscreen="true">
            <div class="form">
                <div class="title">
                    <strong>Please insert your information below</strong>
                </div>
                <div class="input">
                    <ion-label class="label">Name</ion-label>
                    <ion-input placeholder="Name"></ion-input>
                </div>
                <div class="input">
                    <ion-label class="label">Username</ion-label>
                    <ion-input placeholder="Username"></ion-input>
                </div>
                <div class="input">
                    <ion-label class="label">Password</ion-label>
                    <ion-input placeholder="Password"></ion-input>
                </div>
                
                <ion-button>Create Account</ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonInput, IonButton, IonLabel } from '@ionic/vue';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'CreateAccountPage',
  components: {
    IonContent,
    IonPage,
    IonInput,
    IonButton,
    IonLabel
  },
  setup() {
    const image = computed(() => require('@/assets/PocketLib.png'))
    return {
      image,
    }
  },
})

</script>

<style scoped>

    .title{
        margin-left: auto;
        margin-top: 10px;
        text-align: center;
        margin-bottom: 30px;

        font-size: 20px;
    }

    .form{
        margin-top: 10%;
        margin-left: auto;
        margin-right:auto;

        width: 80%;
    }

        .form .label{
            display:inline-block;
            padding-top: 5px;
            padding-left: 5px;
        }

        .form .input{
            margin-top: 15px;

            border: 1px solid black;

        }

        .form .button{
            margin-top: 20px;
            margin-left: auto;
            margin-right: auto;

            width: 50vw;
            height: 6vw;

            font-size: 4vw;
        }
</style>