
<template>
  <v-app>
    <AppTopBar />
    <AppNav />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import AppTopBar from '@/components/layout/AppTopBar.vue';
import AppNav from '@/components/layout/AppNav.vue';
</script>
