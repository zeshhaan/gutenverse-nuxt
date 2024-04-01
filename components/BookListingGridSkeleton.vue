<template>
  <section
    class="grid grid-cols-auto md:grid-cols-2 lg:grid-cols-4 md:gap-x-8 gap-y-16"
  >
    <div
      v-for="(_n, id) in 10"
      :key="id"
      class="flex flex-col items-center space-y-2"
    >
      <div class="relative w-full border-2 border-gray-100 rounded-lg p-4">
        <Skeleton class="flex h-64 w-full" />
      </div>
      <div class="flex items-center justify-between space-x-2 max-w-xs w-full">
        <p class="truncate">
          <Skeleton class="flex w-[250px] h-5 rounded-md" />
        </p>
        <div class="flex text-gray-400">
          <Skeleton class="flex w-[50px] h-5 rounded-md" />
        </div>
      </div>
      <div class="w-full flex gap-4">
        <Skeleton class="flex w-full h-10 rounded-md" />
      </div>
    </div>
  </section>
</template>
