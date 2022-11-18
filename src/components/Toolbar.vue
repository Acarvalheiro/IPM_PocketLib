<template>

    <MenuComponent />
    <ion-page id="main-component">
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <div class="profile_logo">                    
                    <img :src="require('@/assets/profile.png')" >
                </div>
                <div id="pocketLib_logo">                    
                    <img :src="require('@/assets/PocketLib.png')" >
                </div>
            </ion-toolbar>
        </ion-header>
    </ion-page>

</template>

<script lang="ts">
import { IonHeader, IonPage, IonToolbar, IonButtons, IonMenuButton} from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import MenuComponent from '@/components/MenuComponent.vue'


export default defineComponent({
    name: 'ToolbarComponent',
    components: {
        IonHeader,
        IonPage,
        IonToolbar,
        IonButtons,
        MenuComponent,
        IonMenuButton
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

#pocketLib_logo {
    scale: 0.5;
    margin: auto;
    width: 50%;
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