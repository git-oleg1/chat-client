<template>
  <v-list lines="two" nav>
    <v-list-item v-for="(item, i) in store.rooms" :key="i" :value="item" :prepend-avatar="item.avatar" color="primary">
      <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
      <v-list-item-title v-text="item.title"></v-list-item-title>
      <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
      <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<script lang="ts" setup>
import { useAppStore } from '../store/app';

const store = useAppStore();

</script>
