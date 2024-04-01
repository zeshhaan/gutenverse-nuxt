<template>
  <PageHeader class="page-header pb-8">
    <PageHeaderHeading>Gutenverse</PageHeaderHeading>
    <PageHeaderDescription>
      Search over a library of 70,000 free eBooks. Powered by Gutendex API.
    </PageHeaderDescription>
    <PageAction>
      <Input
        v-model="searchValue"
        placeholder="Try to type anything..."
        type="text"
      />
    </PageAction>
  </PageHeader>
  <Select v-model="selectedGenre">
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Select a Genre" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Genre</SelectLabel>
        <SelectItem v-for="(genre, id) in genres" :value="genre.value">
          {{ genre.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
  <BookListingGridSkeleton v-if="pending" />
  <BookListingGrid ref="el" :data="books" />
</template>

<script setup lang="ts">
import type { Book, BookResponse } from "~/types";

const el = ref<Document>();
const currentPage = ref(1);
const searchValue = ref("");
const selectedGenre = ref();
const genres = ref([
  {
    icon: "streamline:chat-two-bubbles-oval-solid",
    label: "Fiction",
    value: "fiction",
  },
  {
    icon: "mdi:bookshelf",
    label: "Drama",
    value: "drama",
  },
  {
    icon: "mdi:emoticon-happy",
    label: "Humor",
    value: "humor",
  },
  {
    icon: "mdi:account-group",
    label: "Politics",
    value: "politics",
  },
  {
    icon: "mingcute:miyajima-torii-fill",
    label: "History",
    value: "history",
  },
  {
    icon: "material-symbols:googler-travel",
    label: "Adventure",
    value: "adventure",
  },
]);

const fetchBooks = await useFetch<BookResponse>("/api", {
  query: {
    page: currentPage.value,
    search: encodeURIComponent(searchValue.value),
    genre: selectedGenre.value,
  },
  onResponse({ response }) {
    if (response.status === 200) {
      const nextPage = new URL(response._data.next).searchParams.get("page");
      currentPage.value = nextPage ? Number(nextPage) : currentPage.value;
    }
  },
});

const { data, pending, refresh } = fetchBooks;
const books = ref<Book[]>(data.value?.results ?? []);

useInfiniteScroll(
  el,
  async () => {
    const response = fetchBooks;
    books.value.push(...(response.data.value?.results || []));
  },
  {
    distance: 100,
    canLoadMore: () => data.value?.next !== null,
  }
);

watch(selectedGenre, () => {
  refresh();
});
</script>