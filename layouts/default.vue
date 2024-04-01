<template>
  <div class="flex min-h-screen w-full flex-col">
    <header
      class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 bg-white z-10"
    >
      <NuxtLink class="text-xl font-semibold" to="/">Gutenverse</NuxtLink>
      <div class="ml-auto flex space-x-2 sm:justify-end">
        <Button variant="secondary" @click="navigateTo('/my-library')">
          <Icon
            name="material-symbols:bookmark"
            color="black"
            class="w-4 h-4 mr-2"
          />
          My Library
        </Button>
        <Button variant="ghost" size="icon" v-if="false">
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
      <slot />
    </main>
    <footer>
      <div
        class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row"
      >
        <div
          class="text-center text-sm leading-loose text-muted-foreground md:text-left"
        >
          <span class="inline-block">
            Built using
            <a
              href="https://gutendex.com/"
              target="_blank"
              class="underline underline-offset-4 font-bold decoration-foreground"
            >
              Gutendex API
            </a>
          </span>

          <span class="ml-0.5"> . </span>
          <span class="inline-block ml-2">
            The code source is available on
            <a
              href="https://github.com/zeshhaan/gutenverse-nuxt"
              target="_blank"
              class="underline underline-offset-4 font-bold decoration-foreground"
            >
              GitHub
            </a>
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>
