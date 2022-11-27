<template>
  <book-info
    v-for="book in books"
    v-bind:key="book.title"
    @removeEvent="$emit('removeEvent', book.title, book.id)"
    :id="book.id"
    :title="book.title"
    :author="book.author"
    :image="book.image"
    :inList="inList"
    :readLists="readLists"
    :show="book.show"
    :status="book.status"
    :reserved="reserved"
    :date="book.date"
    :library="book.library"
  >
  </book-info>
</template>

<script>
  import { defineComponent } from "vue";
  import BookInfo from "@/components/BookInfo.vue";

  export default defineComponent({
    name: "BookList",
    components: {
      BookInfo,
    },
    props: {
      books: {
        type: Array,
        required: true,
      },
      readLists: {
        type: Array,
        required: false,
      },
      inList: {
        type: Boolean,
        required: false,
        default: false,
      },
      reserved: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    emits: ["removeEvent"],
  });
</script>
