<template>
  <v-list nav>
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :value="item"
      color="primary"
      :active="item.value === active"
      @click="$router.push({ name: item.value })"
    >
      <template v-slot:prepend>
        <v-icon :icon="item.icon"></v-icon>
      </template>
      <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
      <v-list-item-title v-text="item.title"></v-list-item-title>
    </v-list-item>
  </v-list>
</template>


<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const active = computed(() => route.name);

const items = ref([
    {
      icon: "mdi-account",
      title: 'Пользователи',
      value: 'Playground-User',
    },
    {
      icon: "mdi-chat",
      title: 'Чаты',
      value: 'Playground-Chat',
    },
    {
      icon: "mdi-wifi",
      title: 'Подключения',
      value: 'Playground-Socket',
    },
  ],
)
</script>
