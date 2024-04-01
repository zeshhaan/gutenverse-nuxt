<template>
  <section
    ref="el"
    class="grid grid-cols-auto md:grid-cols-2 lg:grid-cols-4 md:gap-x-8 gap-y-16 h-screen overflow-y-scroll"
  >
    <div
      v-for="book in data"
      :key="book.id"
      class="flex flex-col items-center space-y-2"
    >
      <div class="relative w-full border-2 border-gray-100 rounded-lg p-4">
        <NuxtImg
          :src="book.formats['image/jpeg']"
          :alt="book.title"
          loading="lazy"
          format="webp"
          class="h-64 w-full object-scale-down transition-all hover:scale-105"
        />
      </div>
      <div class="flex items-center justify-between space-x-2 max-w-xs w-full">
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
      <div class="w-full flex gap-4">
        <Button
          variant="outline"
          class="w-full"
          @click="openFirstAvailableFormat(book.formats)"
        >
          <Icon
            name="solar:download-square-bold"
            class="w-4 h-4 mr-2 text-gray-600"
          />
          Download
        </Button>
        <Button
          v-if="showAddToLibraryButton"
          variant="ghost"
          class="w-full"
          @click="addToLocalStorage(book.id)"
        >
          <Icon
            name="material-symbols:bookmark-add"
            class="w-4 h-4 mr-2 text-gray-600"
          />
          Add to Library
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { useToast } from "@/components/ui/toast/use-toast";
import type { Book, Format } from "~/types";

withDefaults(
  defineProps<{
    data: Book[];
    showAddToLibraryButton?: boolean;
  }>(),
  {
    showAddToLibraryButton: true,
  }
);
const { toast } = useToast();

// #region Local Storage
const savedBooks = useStorage("saved-books", { ids: "" });

const addToLocalStorage = (id: number) => {
  const currentBook = savedBooks.value;

  if (currentBook.ids) {
    savedBooks.value = { ids: `${currentBook.ids},${id}` };
  } else {
    savedBooks.value = { ids: `${id}` };
  }
  toast({
    title: "Added to your library",
    description: "You can now view them in your library",
  });
};
// #endregion

// #region download ebook
const preferredFormats = [
  "text/html",
  "application/pdf",
  "text/plain; charset=utf-8",
];

function openFirstAvailableFormat(format: Format) {
  const formatKeys = Object.keys(format);
  const availableFormats = formatKeys.filter((key) =>
    preferredFormats.includes(key)
  );

  if (availableFormats.length) {
    const firstAvailableFormat = availableFormats[0];
    toast({
      title: "Opened on a new tab",
    });
    window.open(format[firstAvailableFormat], "_blank");
  } else {
    toast({
      variant: "destructive",
      title: "No available formats for this book",
    });
  }
}
// #endregion
</script>
