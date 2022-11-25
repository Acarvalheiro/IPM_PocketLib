<template>
    <ion-page>
        <ion-content>
            <ToolbarComponent />
            <ion-list class="reservation-type">
                <ion-item>
                    <ion-select interface="popover" placeholder="Select Region" @ion-change="onChange($event)">
                        <ion-select-option>All</ion-select-option>
                        <ion-select-option v-for="(regionName, regionId) in regions" v-bind:key="regionId">
                            {{ regionId }}
                        </ion-select-option>
                    </ion-select>

                </ion-item>
            </ion-list>
            <div class="library-list">
                <div v-for="(region, regionID) in regions" v-bind:key="region" class="region-block">
                    <div class="region-libraries" v-if="(regionsShow == regionID || regionsShow == 'All')">
                        <h2 class="region-name">{{ regionID }}</h2>
                        <div v-for="library in region" v-bind:key="library.name" class="library">
                            <h3 class="library-name">{{ library.name }}</h3>
                            <div class="library-info">
                                <div class="info-field">
                                    <ion-icon :icon="homeOutline"></ion-icon>
                                    <p>{{ library.address }}</p>
                                </div>
                                <div class="info-field">
                                    <ion-icon :icon="callOutline"></ion-icon>
                                    <p>{{ library.phone }}</p>
                                </div>
                                <div class="info-field">
                                    <ion-icon :icon="mailOutline"></ion-icon>
                                    <p>{{ library.email }}</p>
                                </div>
                            </div>
                            <ion-button @click="this.openMessage(library)"
                                v-bind:color="(library.availability == 'Available') ? 'success' : (library.availability == 'Borrowed') ? 'warning' : 'danger'">
                                {{ library.availability }}
                            </ion-button>
                            <Transition>
                                <div v-if="reserveMessage || notificationMessage || requestMessage" class="message">
                                    <div class="message-wrapper">
                                        <div v-if="reserveMessage" class="message-text">
                                            <div class="message-title">
                                                <h4> Confirm reservation details</h4>
                                                <font-awesome-icon @click="this.closeMessage()" icon=" fa-xmark" />
                                            </div>
                                            <p>Book: {{ livro }}</p>
                                            <p>Library: {{ library.name }}</p>
                                            <p>User: ambrosio</p>
                                        </div>
                                        <div v-if="notificationMessage" class="message-text">
                                            <div class="message-title">
                                                <h4>Do you want to be notified when this book becomes available again?
                                                </h4>
                                                <font-awesome-icon @click="this.closeMessage()" icon=" fa-xmark" />
                                            </div>
                                        </div>
                                        <div v-if="requestMessage" class="message-text">
                                            <div class="message-title">
                                                <h4>The selected book is currently unavailable at this library. <br> Do
                                                    you
                                                    wish
                                                    to request it?</h4>
                                                <font-awesome-icon @click="this.closeMessage()" icon=" fa-xmark" />
                                            </div>
                                        </div>
                                        <ion-button @click="addToDB" color="success">
                                            Confirm
                                        </ion-button>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>

                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import {
    IonContent, IonPage, IonButton, IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
} from '@ionic/vue';
import { defineComponent, onMounted } from 'vue';
import ToolbarComponent from '@/components/Toolbar.vue'
import { homeOutline, mailOutline, callOutline, librarySharp } from 'ionicons/icons';
import { useFirestore } from 'vuefire'
import { useCollection } from 'vuefire'
import { collection, addDoc } from 'firebase/firestore'


let num = 0;

export default defineComponent({

    name: 'LibrariesPage',
    components: {
        IonContent,
        IonPage,
        ToolbarComponent,
        IonButton,
        IonList,
        IonItem,
        IonSelect,
        IonSelectOption,
    },
    data() {
        return {
            regionsShow: "All",
            livro: "Way of Kings",
            regions: [],
            reserveMessage: false,
            notificationMessage: false,
            requestMessage: false
        }
    },
    methods: {
        onChange(event) {
            console.log(event.target.value)
            this.regionsShow = event.target.value;
        },

        checkAvailability(book) {

            this.libraries.forEach(lib => {
                let availableBooks = lib.available;
                let borrowedBooks = lib.borrowed;
                availableBooks.every(element => {
                   
                    if (element == book) {
                        lib.availability = "Available"
                        return false;
                    }
                });
                borrowedBooks.every(element => {
                    if (element == book) {
                        lib.availability = "Borrowed"
                        return false;
                    }
                });
                if (lib.availability == "") {
                    lib.availability = "Unavailable"
                }
            });
        },
        openMessage(library) {
            if (library.availability == "Available") {
                this.reserveMessage = !this.reserveMessage;
            }
            if (library.availability == "Borrowed") {
                this.notificationMessage = !this.notificationMessage
            }
            if (library.availability == "Unavailable") {
                this.requestMessage = !this.requestMessage
            }

        },
        closeMessage() {
            this.reserveMessage = false
            this.notificationMessage = false
            this.requestMessage = false
        },

        addToDB() {
            console.log(this.test)
            addDoc(this.test, {
                "name": "Biblioteca do Porto",
                "address": "R. de Dom João IV 2, 4000-296 Porto",
                "availability": "",
                "email": "biblioalcporto@gmail.com",
                "available": [],
                "borrowed": [],
                "region": "Porto",
                "phone": "939245874"
            })
        }


    },

    setup() {
        const db = useFirestore()
        const test = collection(db, 'libraries')
        const libraries = useCollection(collection(db, 'libraries'))

        return { homeOutline, mailOutline, callOutline, libraries, db, test }
    },

    mounted() {

        this.checkAvailability('Way of Kings');
        this.regions = this.libraries.reduce((group, library) => {
            const { region } = library;
            group[region] = group[region] ?? [];
            group[region].push(library);
            return group;
        }, {});
    }


});
</script>
<style scoped>
h3 {
    margin: 0;
}

.library-list {
    display: flex;
    flex-direction: column;
}

.library-list .library-search-bar {}

.library-list .region-block {
    display: flex;
    flex-direction: column;
}

.library-list .region-block .region-name {
    display: flex;
    align-items: center;
    margin: 0;
    padding-left: 20px;
    font-size: 30px;
    font-weight: 600;
    height: 10vh;
    border-bottom-style: solid;
    border-width: 2px;
}

.library-list .region-block .library {
    display: flex;
    flex-direction: column;
    border-bottom-style: solid;
    border-width: 1px;
    padding: 0 30px 20px;
}

.library-list .region-block .library:last-child {
    border-width: 2px;
}

.library-list .region-block .library .library-name {
    padding: 20px 0 10px;
}

.library-list .region-block .library .library-info .info-field {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 5px;
}

.library-list .region-block .library .library-info p {
    margin: 0%;
    font-size: 14px;
    line-height: 16px;
}

ion-icon {
    padding-right: 10px;
    height: 20px;
    width: 20px;
}


ion-button {
    margin: 0;
}

ion-button::part(native) {
    margin-left: auto;
    width: fit-content;
}

.library-list .region-block .library .message {
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vh;

}

.library-list .region-block .library .message .message-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 30px 30px;
    margin: 0 15px;
    background-color: white;
    border-radius: 50px;
}

.library-list .region-block .library .message .message-wrapper .message-text {
    padding-bottom: 10px;
}

.library-list .region-block .library .message .message-wrapper .message-text .message-title {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    text-align: center;
    padding-bottom: 10px;
}

.library-list .region-block .library .message .message-wrapper .message-text svg {
    height: 35px;
    width: 35px;
    position: absolute;
    top: 18px;
    right: 15px;
}

.library-list .region-block .library .message .message-wrapper .message-text h4 {
    margin: 0;
}

.library-list .region-block .library .message .message-wrapper .message-text p {
    margin: 0;
    padding-bottom: 5px;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

ion-select {
  --placeholder-opacity: 1;
  width: 100%;
  justify-content: center;
}

ion-select::part(placeholder),
ion-select::part(text) {
  flex: 0 0 auto;
}
</style>
