<template>

  <MenuComponent/>
  <ion-page id="main-component">
      <ToolbarComponent/>
      <ion-content :fullscreen="true">
        <div class="wrapper">
          <div class="container" id="logoImage">
            <img :src="require('@/assets/PocketLib.png')">
          
        <div class="container1">
          <SearchComponent/>
          <div class="container2">
            <ReadListSelectorComp/>
            <div class="container3">
              <HorizBookList/>
            </div>
          </div>
        </div>
        
      </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent, computed } from 'vue';
import SearchComponent from '@/components/SearchComponent.vue'
import ToolbarComponent from '@/components/Toolbar.vue'
import MenuComponent from '@/components/MenuComponent.vue'
import ReadListSelectorComp from '@/components/ReadListSelector.vue'
import HorizBookList from '@/components/HorizBookList.vue'


let num = 0;

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
    SearchComponent,
    ToolbarComponent,
    MenuComponent,
    ReadListSelectorComp, 
    HorizBookList
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
  left: 0;
  right: 0;
}

.wrapper {
  position: relative;
  width: auto;
  height: 200px;
  }

.container1 {
  position: absolute;
  right: 0;
  left: 0;
}

.container2 {
  position: absolute;
    left: 170px;
    width: fit-content;
}

.container3 {
  position: absolute;
    left: -60px;
    top: 130%;
}



</style>