<template>
  <PageHeader class="page-header pb-8">
    <PageHeaderHeading>My Library</PageHeaderHeading>
    <PageHeaderDescription>
      Your saved books from Gutenverse library will appear here
    </PageHeaderDescription>
  </PageHeader>
  <BookListingGridSkeleton v-if="!books.length" />
  <BookListingGrid :data="books" :show-add-to-library-button="false" />
</template>

<script setup lang="ts">
import type { Book, BookResponse } from "@/types";

const books = ref<Book[]>([]);

onMounted(async () => {
  const savedBooks = localStorage.getItem("saved-books");
  const bookIds = savedBooks ? JSON.parse(savedBooks) : [];

  await $fetch<BookResponse>("/api/saved", {
    query: {
      ids: bookIds ? bookIds.ids : null,
    },
    onResponse({ response }) {
      if (response.ok) {
        books.value = response._data.results;
      }
    },
  });
});
</script>
