<template>
    <div class="book-info-wrapper" v-show="show">
        <img :src="require(`@/assets/${image}`)" alt="image" @click="() => router.push('/book')"/>
        <div class="text-wrapper">
            <h3 @click="() => router.push('/book')">{{title}}</h3>
            <p @click="() => router.push('/book')">{{author}}</p>
            <ion-list class="add-dropdown" v-show="!inList">
                <ion-item>
                    <ion-select interface="popover" placeholder="Add to readlist" :selected-text="addedTo" 
                    :multiple="true" @ion-change="onChange($event)">
                        <ion-select-option v-for="elem in readLists" v-bind:key="elem" :value="elem">
                            {{elem}}
                        </ion-select-option>
                    </ion-select>
                </ion-item>
            </ion-list>
            <ion-button size="small" color="danger" v-show="inList" @click="$emit('removeEvent')">
                <span>
                    Remove
                    <ion-icon name="close-outline" size="small"></ion-icon>
                </span>
            </ion-button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { IonList, IonItem, IonSelect, IonSelectOption, IonButton, IonIcon } from '@ionic/vue';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';

export default defineComponent({
    name:"BookInfo",
    components: { IonList, IonItem, IonSelect, IonSelectOption, IonButton, IonIcon },
    props: {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        readLists: {
            type: Array,
            required: false
        },
        inList: {
            type: Boolean,
            required: false,
            default: false
        },
        show: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    data() {
        return {
            addedTo: ""
        }
    },
    created() {
        addIcons({
            'close-outline': closeOutline
        });
    },
    setup() {
      const router = useRouter();
      return { router };
    },
    emits: ['removeEvent'],
    methods: {
        onChange(event) {
            if(event.target.value == 0) {
                this.addedTo = ""
            } else {
                this.addedTo = "Added to readlist"
            }
        },
    }
})
</script>

<style scoped>
    .book-info-wrapper {
        display: flex;
        column-gap: 20px;
        width: 100%;
        padding: 15px 10px;
    }
        .book-info-wrapper img {
            width: 40%;
        }
        .book-info-wrapper .text-wrapper h3 {
            margin-bottom: 5px;
        }
        .book-info-wrapper .text-wrapper p {
            margin-top: 0;
            margin-bottom: 0;
        }
        .book-info-wrapper .text-wrapper .add-dropdown {
            padding: 0;
            margin-top: 10px;
        }
            .book-info-wrapper .text-wrapper .add-dropdown ion-item {
                --padding-start: 0;
            }
        .book-info-wrapper .text-wrapper ion-button {
            margin-top: 25px;
        }
            .book-info-wrapper .text-wrapper ion-button span{
                display: flex;
                column-gap: 5px;
                align-items: center;
            }
</style>