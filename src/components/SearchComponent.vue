<template>
  <div id="show_filtered_books">
    <input type="text" v-model="search" placeholder="Search books"/>
    <div v-for="book in filteredBooks" :key="book.id" class="single-book">
      <h2>{{book.id}} {{book.name}}</h2>
    </div>
  </div>
</template>
    
<script lang="ts">

import {} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchComponent',
  components: {},
  data() {
    return {
      books: [
        { id: 1, name: "Foo" },
        { id: 2, name: "Bar" },
        { id: 3, name: "Baz" },
        { id: 4, name: "Foobar" }
      ],
      search: ""
    };
  },

  computed: {
    filteredBooks: function() {
      return this.books.filter((book) => {
        return book.name.match(this.search);
      })
    }
  }

});

</script>