<template>

    <MenuComponent />

    <ion-page id="main-component">
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>Toolbar</ion-title>
                <router-link to="/profile">
                    <img :src="require('@/assets/profile.png')" width="25" height="25" class="profile_logo">
                </router-link>
            </ion-toolbar>
        </ion-header>
    </ion-page>

</template>

<script lang="ts">
import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons } from '@ionic/vue';
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
.profile_logo {
    position: absolute;
    right: 10px;
    top: 15px;
}
</style>