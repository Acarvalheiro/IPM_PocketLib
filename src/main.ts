import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faXmark  } from '@fortawesome/free-solid-svg-icons'

import 'aos/dist/aos.css'

import { VueFire} from 'vuefire'
import { firebaseApp } from './firebase'

/* add icons to the library */
library.add(faXmark)

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  
  app
  .use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
  })

router.isReady().then(() => {
  app.mount('#app');
});





