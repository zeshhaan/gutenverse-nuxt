<script setup lang="ts">
import { Input } from "@/components/ui/input";
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="w-full flex justify-center">
    <Input
      :value="props.modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      type="search"
      placeholder="Search..."
      class="w-full md:w-[100px] lg:w-[300px]"
    />
  </div>
</template>
