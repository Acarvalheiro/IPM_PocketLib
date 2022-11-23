<template>
    <book-info :id="book.title" v-for="book in books" v-bind:key="book.title" @removeEvent="$emit('removeEvent', book.title)"
    :title="book.title" :author="book.author" :image="book.image" :inList="inList" :readLists="readLists" :show="book.show">
    </book-info>
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
            required: false
        },
        inList: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    emits: ['removeEvent']
})
</script>
