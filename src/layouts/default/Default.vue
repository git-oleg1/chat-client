<template>
  <v-app id="inspire">
    <v-navigation-drawer width="286">
      <router-view name="navigation"></router-view>
    </v-navigation-drawer>

    <router-view></router-view>

    <!-- <v-main></v-main> -->

    <!-- <v-navigation-drawer location="right">
      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          :title="`Item ${ n }`"
          link
        ></v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <!-- <v-footer
      app
      height="72"
    >
      <v-text-field
        bg-color="grey-lighten-1"
        class="overflow-hidden"
        density="compact"
        flat
        hide-details
        rounded="pill"
        variant="solo-filled"
      ></v-text-field>
    </v-footer> -->
  </v-app>
</template>

<script lang="ts" setup>
</script>
