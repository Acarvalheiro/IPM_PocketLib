<template>
    <div class="list-info-wrapper" :id="title">
        <img class="thumbnail" @click="() => router.push('/readlist')" :src="require(`@/assets/${image}`)" alt="image"/>
        <div class="text-wrapper">
            <h3 @click="() => router.push('/readlist')">{{title}}</h3>
            <p @click="() => router.push('/readlist')">{{author}}</p>
            <ion-button size="small" color="danger" @click="$emit('removeEvent', title)">
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
import { IonButton, IonIcon } from '@ionic/vue';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';

export default defineComponent({
    name:"BookInfo",
    components: { IonButton, IonIcon },
    props: {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: false,
            default: "User"
        },
        image: {
            type: String,
            required: false,
            default: "clean-code.jpg"
        },
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
})
</script>

<style scoped>
    .list-info-wrapper {
        display: flex;
        column-gap: 20px;
        width: 100%;
        padding: 15px 10px;
    }
        .list-info-wrapper img {
            width: 40%;
        }
            .list-info-wrapper .text-wrapper h3 {
                margin-bottom: 5px;
            }
            .list-info-wrapper .text-wrapper p {
                margin-top: 0;
                margin-bottom: 0;
            }

            .list-info-wrapper .text-wrapper ion-button {
                margin-top: 25px;
            }
            .list-info-wrapper .text-wrapper ion-button span{
                display: flex;
                column-gap: 5px;
                align-items: center;
            }
</style>