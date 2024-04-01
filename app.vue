<template>
  <div class="flex min-h-screen w-full flex-col">
    <header
      class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 bg-white z-10"
    >
      <h2 class="text-xl font-semibold">Gutenverse</h2>
      <div class="ml-auto flex space-x-2 sm:justify-end">
        <Button variant="ghost">
          <Icon
            name="material-symbols:bookmark"
            color="black"
            class="w-4 h-4 mr-2"
          />
          My Library
        </Button>
        <Button variant="ghost" size="icon">
          <Icon
            name="fluent:dark-theme-20-filled"
            color="black"
            class="w-4 h-4"
          />
        </Button>
      </div>
    </header>
    <main
      class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
    >
      <PageHeader class="page-header pb-8">
        <PageHeaderHeading>Gutenverse</PageHeaderHeading>
        <PageHeaderDescription>
          Beautifully designed library of over 70,000 free eBooks. Powered by
          Gutendex
        </PageHeaderDescription>
        <PageAction>
          <Input
            v-model="searchText"
            type="search"
            placeholder="Search..."
            class="w-full md:w-[100px] lg:w-[300px]"
          />
        </PageAction>
      </PageHeader>
      <section id="blocks" class="grid overflow-scroll gap-24 lg:gap-48">
        <div class="grid grid-flow-col gap-4">
          <Button
            v-for="(genre, id) in genres"
            :key="id"
            :disabled="selectedGenre === genre.value"
            :variant="selectedGenre === genre.value ? 'secondary' : 'ghost'"
            @click="selectedGenre = genre.value"
          >
            <Icon :name="genre.icon" color="black" class="w-4 h-4 mr-2" />
            {{ genre.label }}
          </Button>
        </div>
      </section>
      <section
        ref="el"
        class="grid grid-cols-auto md:grid-cols-2 lg:grid-cols-4 md:gap-x-8 gap-y-16 h-screen overflow-y-scroll"
      >
        <div
          v-for="book in data"
          :key="book.id"
          class="flex flex-col items-center space-y-2"
        >
          <div class="w-full border-2 border-gray-100 rounded-lg p-4">
            <NuxtImg
              :src="book.formats['image/jpeg']"
              :alt="book.title"
              loading="lazy"
              format="webp"
              class="h-64 w-full object-scale-down transition-all hover:scale-105"
            />
          </div>
          <div
            class="flex items-center justify-between space-x-2 max-w-xs w-full"
          >
            <p class="truncate">
              {{ book.title }}
            </p>
            <div class="flex text-gray-400">
              <Icon name="solar:download-square-bold" class="w-4 h-4 mr-1" />
              <p class="text-xs">
                {{
                  book.download_count.toLocaleString("en-US", {
                    notation: "compact",
                    compactDisplay: "short",
                  })
                }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { BookResponse, Book } from "@/types";

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

const selectedGenre = ref();
const searchText = ref();

// const { data: library } = await useFetch<BookResponse>("/api", {
//   async onResponse({ response }) {
//     console.log(response._data.next);
//   },
// });

const el = ref<Document>();
const data = ref<Book[]>([]);
let currentPage = 1;
let nextUrl:
  | string
  | null = `https://gutendex.com/books/?mime_type=image&page=${currentPage}`;

async function fetchBooks(
  url: string,
  genre?: string,
  search?: string
): Promise<BookResponse> {
  let queryUrl = url;
  if (genre) {
    queryUrl += `&topic=${genre}`;
  }
  if (search) {
    queryUrl += `&search=${search}`;
  }
  return await $fetch(queryUrl);
}

useInfiniteScroll(
  el,
  async () => {
    const response: BookResponse = await fetchBooks(nextUrl);
    data.value?.push(...response.results);
    nextUrl = response.next;
  },
  { distance: 0, canLoadMore: () => !!nextUrl }
);

watchDebounced(
  searchText,
  async (newSearchText) => {
    // Reset currentPage and nextUrl
    currentPage = 1;
    nextUrl = `https://gutendex.com/books/?mime_type=image&page=${currentPage}`;

    // Fetch new data
    const response: BookResponse = await fetchBooks(
      nextUrl,
      selectedGenre.value,
      newSearchText
    );

    // Clear existing data and update with new data
    data.value = response.results;

    // Update nextUrl for infinite scroll
    nextUrl = response.next;
  },
  { debounce: 500 }
);
</script>
