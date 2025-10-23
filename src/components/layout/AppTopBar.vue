<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon />
    <v-toolbar-title class="font-semibold">TMS Web Demo v2</v-toolbar-title>
    <v-spacer />
    <v-btn icon :to="{ path: '/dashboard' }" title="Dashboard"
      ><v-icon>mdi-view-dashboard</v-icon></v-btn
    >
    <v-btn icon :to="{ path: '/personnel' }" title="Personnel"
      ><v-icon>mdi-account-multiple</v-icon></v-btn
    >
    <v-btn icon :to="{ path: '/skill' }" title="Skills"><v-icon>mdi-school</v-icon></v-btn>
    <v-snackbar
      v-model="snackbarModel"
      location="top right"
      :timeout="2000"
      :color="toast.color"
      variant="tonal"
    >
      {{ toast.message }}
    </v-snackbar>
  </v-app-bar>
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  import { useToastState } from '@/plugins/toast';
  const toast = useToastState();
  const snackbarModel = computed({
    get: () => toast.open.value,
    set: (v: boolean) => (toast.open.value = v),
  });
</script>
