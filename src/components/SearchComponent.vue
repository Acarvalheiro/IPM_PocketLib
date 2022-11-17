<template>
    <ion-searchbar></ion-searchbar>
</template>
    
<script lang="ts">
    import {
      IonSearchbar
    } from '@ionic/vue';
    import { defineComponent } from 'vue';
    
    export default defineComponent({
      name: 'SearchComponent',
      components: {
        IonSearchbar
      },
    });
</script>