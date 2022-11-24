<template>
    <ion-list>
      <ion-item>
        <ion-select interface="popover" placeholder="Your readbooks..">
          <IonSelectOption value="favBooks">Favourite Books</IonSelectOption>
          <IonSelectOption value="toRead">To read</IonSelectOption>
          <IonSelectOption value="trending">Trending</IonSelectOption>
        </ion-select>
      </ion-item>
    </ion-list>
  </template>
  
  <script>
    import { IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/vue';
    import { defineComponent } from 'vue';
  
    export default defineComponent({
    name: 'ReadListSelectorComp',
      components: { IonList, IonItem, IonSelect, IonSelectOption },
    });
  </script>