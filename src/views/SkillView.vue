
<template>
  <div class="p-4">
    <v-breadcrumbs :items="[{ title: 'Dashboard', to: '/dashboard' }, { title: 'スキル' }]" />
    <v-alert type="info" variant="tonal" class="mb-4">スキルは「人材管理」画面からモーダルで編集できます。</v-alert>
    <v-card><v-card-text>スタブ画面</v-card-text></v-card>
  </div>
</template>
<script setup lang="ts"></script>
