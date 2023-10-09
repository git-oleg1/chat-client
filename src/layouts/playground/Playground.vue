<template>
  <v-app>
    <v-navigation-drawer width="286">
      <router-view name="navigation"></router-view>
    </v-navigation-drawer>

    <v-app-bar
      class="px-4"
      color="grey-lighten-7"
      flat
      height="72"
    >
      <span class="text-h6">Playground</span>

      <v-spacer></v-spacer>

      <v-tooltip :text="$socket.state.connected ? 'Сокет подключен' : 'Сокет отключен'">
        <template v-slot:activator="{ props }">
          <v-icon v-if="$socket.state.connected" v-bind="props" icon="mdi-wifi 'mdi-wifi-off'" color="primary"></v-icon>
          <v-icon v-else icon="mdi-wifi-off" v-bind="props" color="grey-darken-3"></v-icon>
        </template>
      </v-tooltip>

    </v-app-bar>

    <router-view></router-view>
  </v-app>
</template>

<script lang="ts" setup>
</script>
