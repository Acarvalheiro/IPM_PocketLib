<template>
  <ion-page id="main-component">
    <MenuComponent />
    <ion-content>
      <img class="qrCodePhoto" :src="require('@/assets/QR_code.png')" />

      <div class="qrContent">
        <h>Show this QR-code at your selected library.</h>
        <p>
          You have 7 days to pick up your book. If the time expires your
          reservation will be automatically cancelled.
        </p>
      </div>
    </ion-content>
  </ion-page>

</template>

<script lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import MenuComponent from "@/components/MenuComponent.vue";
let num = 0;

export default defineComponent({
  name: "QRcode",
  components: {
    IonPage,
    MenuComponent,
    IonContent
  },
});
</script>

<style scoped>
.qrCodePhoto {
  scale: 0.8;
}

.qrContent {
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
}
</style>
