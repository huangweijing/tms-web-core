<template>
  <div class="p-4">
    <v-breadcrumbs
      :items="[{ title: 'Dashboard', to: '/dashboard' }, { title: '問題管理' }]"
    /><QuestionListView />
  </div>
</template>
<script setup lang="ts">
  import QuestionListView from '@/modules/exam/QuestionListView.vue';
</script>
