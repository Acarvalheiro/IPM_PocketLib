<template>

        <ion-header :translucent="true">
            <ion-toolbar>
                <div class = "header">
                    <div class="left-toolbar">
                        <ion-buttons slot="start">
                            <ion-menu-button></ion-menu-button>
                        </ion-buttons>
                    </div>
                    <div @click="() => router.push('/profile')" class="right-toolbar">
                        <ion-icon :icon="person"></ion-icon>
                    </div>
                </div>
            </ion-toolbar>
        </ion-header>
   

</template>

<script lang="ts">
import { IonHeader, IonIcon, IonToolbar, IonButtons } from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import { person } from "ionicons/icons"
import { useRouter } from 'vue-router';



export default defineComponent({
    name: 'ToolbarComponent',
    components: {
        IonHeader,
        IonToolbar,
        IonButtons,
        IonIcon
    },
    setup() {
        const router = useRouter();
        return {
            person,
            router
        }
    },
});

</script>
<style>

#pocketLib_logo {
    scale: 0.5;
    margin: auto;
    width: 50%;
}

.header {
  display: inline-block; 
  width: 100%;
}
.right-toolbar {
  float: right;
}
.left-toolbar {
  float: left;
}

ion-icon {
  font-size: 50px;
}

ion-menu-button{
    font-size: 50px;
}

</style>