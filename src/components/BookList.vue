<template>
    <book-info v-for="book in books" v-bind:key="book.title" 
    :title="book.title" :author="book.author" :image="book.image" :inList="inList" :readLists="readLists"></book-info>
</template>

<script>
import { defineComponent } from 'vue'
import BookInfo from '@/components/BookInfo.vue'

export default defineComponent({
    name: "BookList",
    components: {
        BookInfo    
    },
    props: {
        books: {
            type: Array,
            required: true
        },
        readLists: {
            type: Array,
            required: true
        },
        inList: {
            type: Boolean,
            required: false,
            default: false
        }
    }
})
</script>
<style scoped>

</style>
