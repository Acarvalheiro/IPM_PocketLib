<template>
    <div class="HorizBookList-Wrapper">
        <h2 class="list-title">{{ title }}</h2>
        <div class="HorizBookList">
            <div v-for="(book, index) in books" v-bind:key="book.Title" @click="router.push('/book/'+book.id)" class="book-item" >
                <p class="index">{{ index + 1 }}.</p>
                <img :src="require(`@/assets/${book.image}`)">
                <p class="title">{{ book.title }}</p>
            </div>
        </div>
    </div>

</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";
import { useFirestore } from "vuefire";
import { collection, query, where, getDocs, doc, getDoc, forEach } from "firebase/firestore";
import { useRouter } from 'vue-router';


export default defineComponent({
    name: 'HorizBookList',
    props: {
      books: {
        type: Array,
        required: true,
      },
      title: {
        type: String,
        required: true,
      }
    },
    setup(){
        const router = useRouter()
        return {router}
    }
});
</script>
<style scoped>
.HorizBookList-Wrapper {
    display: flex;
    flex-direction: column;
    text-align: start;
    padding: 10px 0 10px 10px;

}

.HorizBookList-Wrapper>.list-title {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 25px;
    font-weight: 700;
    margin: 0;
}

.HorizBookList-Wrapper>.HorizBookList {
    display: flex;
    flex-direction: row;
    overflow: scroll;
    padding-top: 10px;

}

.HorizBookList-Wrapper>.HorizBookList>.book-item {
    padding-right: 25px;
    flex-shrink: 0;
}

.HorizBookList-Wrapper>.HorizBookList>.book-item>.index {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    margin-bottom: 5px;
}

.HorizBookList-Wrapper>.HorizBookList>.book-item>img {
    height: 30vh;
    padding-left: 20px;
}

.HorizBookList-Wrapper>.HorizBookList>.book-item>.title {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: 500;
    padding-left: 20px;
    margin: 0;
    margin-top: 5px;
}
</style>