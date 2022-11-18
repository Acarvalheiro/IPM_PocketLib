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
        IonToolbar,
        IonButtons,
        MenuComponent
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
    margin-right: -40px;
    scale: 0.3;
    float: right;
    position: relative;
}

ion-toolbar {
    padding-left: var(--padding-start);
    padding-right: var(--padding-end);
    padding-top: var(--padding-top);
    padding-bottom: var(--padding-bottom);
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: var(--min-height);
    contain: content;
    overflow: hidden;
    z-index: 10;
    box-sizing: border-box;
    height: 120px;
}
</style>