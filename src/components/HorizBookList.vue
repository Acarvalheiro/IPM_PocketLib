<template>
    <div class="HorizBookList-Wrapper">
        <h2 class="list-title">{{ title }}</h2>
        <div class="HorizBookList">
            <div class="book-item" v-for="(book, index) in books" v-bind:key="book.Title">
                <p class="index">{{ index + 1 }}.</p>
                <img :src="require(`@/assets/${book.Image}`)">
                <p class="title">{{ book.Title }}</p>
            </div>
        </div>
    </div>

</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
    name: 'HorizBookList',
    data() {
        {
            return {
                title: "Trending",
                books: [{
                    Image: 'Way-of-Kings-200x300 (1).jpg',
                    Title: 'Titulo1'
                },
                {
                    Image: 'Way-of-Kings-200x300 (1).jpg',
                    Title: 'Titulo3'
                },
                {
                    Image: 'Way-of-Kings-200x300 (1).jpg',
                    Title: 'Titulo2'
                }

                ]
            }
        }
    },
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