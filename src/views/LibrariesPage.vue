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
                    <div class="region-libraries" v-if="(regionsShow == (regionID as unknown) || regionsShow == 'All')">
                        <h2 class="region-name">{{ regionID }}</h2>
                        <div v-for="library in region" v-bind:key="library['name']" class="library">
                            <h3 class="library-name">{{ library['name'] }}</h3>
                            <div class="library-info">
                                <div class="info-field">
                                    <ion-icon :icon="homeOutline"></ion-icon>
                                    <p>{{ library['address'] }}</p>
                                </div>
                                <div class="info-field">
                                    <ion-icon :icon="callOutline"></ion-icon>
                                    <p>{{ library['phone'] }}</p>
                                </div>
                                <div class="info-field">
                                    <ion-icon :icon="mailOutline"></ion-icon>
                                    <p>{{ library['email'] }}</p>
                                </div>
                            </div>
                            <ion-button @click="openMessage(library)"
                                v-bind:color="(library['availability'] == 'Reserve' || library['availability'] == 'Reserved') ? 'success' : (library['availability'] == 'Notify me' || library['availability'] == 'Confirmed') ? 'warning' : 'danger'">
                                {{ library['availability'] }}
                            </ion-button>
                            <Transition>
                                <div v-if="((reserveMessage || notificationMessage || requestMessage) && library.name == libraryMessage)"
                                    class="message">
                                    <div class="message-wrapper">
                                        <div v-if="reserveMessage" class="message-text">
                                            <div class="message-title">
                                                <h4> Confirm reservation details</h4>
                                                <font-awesome-icon @click="closeMessage()" icon=" fa-xmark" />
                                            </div>
                                            <p><span class="bolded">Book: </span> {{ book.title }}</p>
                                            <p><span class="bolded">Library: </span> {{ library['name'] }}</p>
                                            <p><span class="bolded">User: </span> ambrosio</p>
                                        </div>
                                        <div v-if="notificationMessage" class="message-text">
                                            <div class="message-title">
                                                <h4>Do you want to be notified when this book becomes available again?
                                                </h4>
                                                <font-awesome-icon @click="closeMessage()" icon=" fa-xmark" />
                                            </div>
                                        </div>
                                        <div v-if="requestMessage" class="message-text">
                                            <div class="message-title">
                                                <h4>The selected book is currently unavailable at this library. <br> Do
                                                    you
                                                    wish
                                                    to request it?</h4>
                                                <font-awesome-icon @click="closeMessage()" icon=" fa-xmark" />
                                            </div>
                                        </div>
                                        <ion-button @click="confirmRequest(library)" color="success">
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
<script lang="ts">
import {
    IonContent, IonPage, IonButton, IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
} from '@ionic/vue';
import { defineComponent, onMounted } from 'vue';
import ToolbarComponent from '@/components/Toolbar.vue'
import { homeOutline, mailOutline, callOutline} from 'ionicons/icons';
import { useFirestore } from 'vuefire'
import { collection, setDoc,addDoc, getDocs, doc, getDoc } from 'firebase/firestore'

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
            book: "" as any,
            bookId :"",
            regions: [] as any[],
            libraries: [] as any[],
            reserveMessage: false,
            notificationMessage: false,
            requestMessage: false,
            libraryMessage: ""
        }
    },
    methods: {
        onChange(event) {
            this.regionsShow = event.target.value;
        },

        checkAvailability(book) {
            this.libraries.forEach(lib => {
                let availableBooks = lib.available;
                let borrowedBooks = lib.borrowed;
                availableBooks.every(element => {

                    if (element == book) {
                        lib.availability = "Reserve"
                        return false;
                    }
                });
                borrowedBooks.every(element => {
                    if (element == book) {
                        lib.availability = "Notify me"
                        return false;
                    }
                });
                if (lib.availability == "") {
                    lib.availability = "Request"
                }
            });
        },
        openMessage(library) {
            if (library.availability == "Reserve") {
                this.reserveMessage = !this.reserveMessage;
            }
            if (library.availability == "Notify me") {
                this.notificationMessage = !this.notificationMessage
            }
            if (library.availability == "Request") {
                this.requestMessage = !this.requestMessage
            }
            this.libraryMessage = library.name

        },
        closeMessage() {
            this.reserveMessage = false
            this.notificationMessage = false
            this.requestMessage = false
        },

        addToDB() {
            addDoc(this.libraryDb, {
                "name": "Biblioteca Pública Municipal de Setúbal",
                "address": "Av. Luísa Todi 188, 2900-249 Setúbal",
                "availability": "",
                "email": "biblioalcsetubal@gmail.com",
                "available": [],
                "borrowed": ['Way of Kings'],
                "region": "Setúbal",
                "phone": "939245874"
            })
        },

        orderRegions(a, b) {
            if (a.region < b.region) {
                return -1
            }
            if (b.region > a.region) {
                return 1
            }
            return 0
        },

        confirmRequest(library) {
            if (this.reserveMessage) {
                library.availability = "Reserved"
                this.reserveMessage = false;
                this.book.status = "Waiting Pick Up"
                setDoc(doc(this.booksDB, this.bookId), this.book)
                setDoc(doc(this.reservedDB, '/' + this.bookId), {"library": library.name})
                this.$router.push("/book/" + this.bookId)
                return
            }
            if ( this.notificationMessage){
                library.availability = "Confirmed"
                this.notificationMessage = false;
                setDoc(doc(this.notificationDB, '/' + this.bookId), {"library": library.name})
                return
            }
            library.availability = "Requested"
                this.requestMessage = false;
                return
        }
    },

    setup() {
        const db = useFirestore()
        const booksDB = collection(db, 'books')
        const libraryDb = collection(db, 'libraries')
        const reservedDB = collection(db, 'reserved')
        const notificationDB = collection(db, 'notifications')
        return { homeOutline, mailOutline, callOutline, db, libraryDb, reservedDB, notificationDB, booksDB }
    },

    mounted() {
        this.bookId = this.$route.params.bookId as string
        getDoc(doc(this.booksDB,this.bookId )).then((v) => {
            this.book = v.data()
        })
        getDocs(this.libraryDb).then((val) => {
            val.forEach(element => {
                this.libraries.push(element.data());
            })
            this.libraries.sort(this.orderRegions)
            this.checkAvailability('Way of Kings');
            this.regions = this.libraries.reduce((group, library) => {
                const { region } = library;
                group[region] = group[region] ?? [];
                group[region].push(library);
                return group;
            }, {}) as any[]; 
        });
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
.library-list .region-block .library .message .message-wrapper .message-text p .bolded{
    font-weight: 600;
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
