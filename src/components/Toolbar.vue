<template>
    <MenuComponent />

    <ion-page id="main-component">
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>Toolbar</ion-title>
                <div class="profile_logo">                    
                    <img :src="require('@/assets/profile.png')" >
                </div>
            </ion-toolbar>
        </ion-header>
    </ion-page>

</template>

<script lang="ts">
import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons} from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import MenuComponent from '@/components/MenuComponent.vue'


export default defineComponent({
    name: 'ToolbarComponent',
    components: {
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonButtons,
        MenuComponent,
    },
    setup() {
    const image = computed(() => require('@/assets/profile.png'))
    return {
      image,
    }
  },
});

</script>
<style>

.profile_logo{
    align-self: right;
    margin-top: 5px;
    margin-right: 5px;
}

</style>