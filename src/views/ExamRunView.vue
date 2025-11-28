<template class="p-4">
  <!-- <v-breadcrumbs
    :items="[{ title: 'Dashboard', to: '/' }, { title: 'Exam Runs' }]"
    class="mt-2" /> -->

  <v-breadcrumbs :items="[{ title: 'Dashboard', to: '/dashboard' }, { title: '試験実施管理' }]" />
  <ExamRunListView />
</template>
<script setup lang="ts">
  import ExamRunListView from '@/modules/examRun/ExamRunListView.vue';
</script>
