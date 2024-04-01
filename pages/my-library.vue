<template>
  <PageHeader class="page-header pb-8">
    <PageHeaderHeading>My Library</PageHeaderHeading>
    <PageHeaderDescription>
      Your saved books from Gutenverse library will appear here
    </PageHeaderDescription>
  </PageHeader>
  <BookListingGridSkeleton v-if="isLoading" />
  <BookListingGrid :data="books" :show-add-to-library-button="false" />
</template>

<script setup lang="ts">
import type { Book, BookResponse } from "@/types";

const books = ref<Book[]>([]);
const isLoading = ref(false);

onMounted(async () => {
  const savedBooks = localStorage.getItem("saved-books");
  const bookIds = savedBooks ? JSON.parse(savedBooks) : [];
  isLoading.value = true;
  await $fetch<BookResponse>("/api/saved", {
    query: {
      ids: bookIds ? bookIds.ids : null,
    },
    onResponse({ response }) {
      if (response.status === 200) {
        isLoading.value = false;
        if (bookIds.ids.length > 0) {
          books.value = response._data.results;
        } else {
          books.value = [];
        }
      }
    },
  });
});
</script>
