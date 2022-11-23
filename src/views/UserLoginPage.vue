<template>

    <ion-page id="main_component">
        <ion-content :fullscreen="true">
            <div class="container" id="logoImage">
                    <img class="image" :src="require('@/assets/PocketLib.png')">
            </div>
            <div class="title">
                <strong>Welcome to PocketLib</strong>
            </div>
            <div>
                <div class="input">
                    <ion-input placeholder="Username"></ion-input>
                </div>
                <div class="input">
                    <ion-input placeholder="Password"></ion-input>
                </div>
            </div>

            <div class="buttons">
                <ion-button class="log-in-button">
                    Log in
                </ion-button>
                <ion-button class="create-acc-button">
                    Create Account
                </ion-button>
            </div>
        </ion-content>
    </ion-page>
    

</template>

<script lang="ts">
import { IonContent, IonPage, IonInput, IonButton } from '@ionic/vue';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'LogInPage',
  components: {
    IonContent,
    IonPage,
    IonInput,
    IonButton
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

    .container{
        margin-top: 100px;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }

        .container .image{
            display: block;
            
            margin-left: auto;
            margin-right: auto;
        }

    .title{
        margin-left: auto;
        margin-top: 10px;
        text-align: center;

        font-size: 20px;
    }

    .input{
        position: relative;
        margin-top: 20px;
        margin-left: auto;
        margin-right: auto;
        width: 80%;

        font-size: 16px;
        border:1px solid black;
    }

    .buttons{
        margin-top: 30px;
        margin-left: auto;
        margin-right: auto;
        width:fit-content;
    }
        .buttons .log-in-button{
            margin-left: 25px;
        }
        .buttons .create-acc-button{
            margin-left: 25px;
        }
</style>