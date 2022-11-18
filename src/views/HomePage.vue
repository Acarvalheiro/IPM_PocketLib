<template>

  <ion-page id="main-component">

    <ion-content :fullscreen="true">
      <ToolbarComponent/>
      
      <div class="container" id="logoImage">
        <img :src="require('@/assets/PocketLib.png')">
      </div>

      <div class="container">
        <SearchComponent/>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import SearchComponent from '@/components/SearchComponent.vue'
import ToolbarComponent from '@/components/Toolbar.vue'

let num = 0;

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
    SearchComponent,
    ToolbarComponent
  },

  setup() {
    const image = computed(() => require('@/assets/PocketLib.png'))
    return {
      image,
    }
  },

  data() {
    {
      return {
        decimal: num,
      }
    }
  },

  methods: {
    increment() {
      this.decimal++;
    }
  }

});
</script>

<style scoped>
.container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 60%;
  transform: translateY(-50%);
}


.container strong {
  font-size: 20px;
  line-height: 26px;
}

.container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

.container a {
  text-decoration: none;
}

#counter {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 75%;
  transform: translateY(-50%);
}

#counter strong {
  font-size: 20px;
  line-height: 26px;
}

#logoImage {
  position: absolute;
  top: 36%;
  left: 0;
  right: 0;
  text-align: center;
}

</style>