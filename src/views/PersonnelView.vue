
<template>
  <div class="p-4">
    <v-breadcrumbs :items="[{ title: 'Dashboard', to: '/dashboard' }, { title: '人材管理' }]" />
    <PersonnelListView />
  </div>
</template>
<script setup lang="ts">
import PersonnelListView from '@/modules/personnel/PersonnelListView.vue';
</script>
