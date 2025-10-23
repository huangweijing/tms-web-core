<template>
  <div class="p-4">
    <h2 class="text-h5 mb-4">
      <v-icon class="mr-2">mdi-view-dashboard</v-icon> ダッシュボード（スタブ）
    </h2>
    <v-card class="mb-4"><v-card-text>左のナビから各画面へ移動してください。</v-card-text></v-card>

    <v-card class="mb-4">
      <v-card-title class="d-flex align-center ga-2">
        <v-icon>mdi-eye</v-icon> 参照モード（モーダル）デモ <v-spacer /><v-btn
          color="primary"
          prepend-icon="mdi-magnify"
          @click="openSelect"
          >人材を選択</v-btn
        >
      </v-card-title>
      <v-card-text>
        <div v-if="selected">
          選択結果：<strong>{{ selected.名前 }}</strong
          >（{{ selected.所属会社 }} / {{ selected.社員番号 }}）
        </div>
        <div v-else>未選択</div>
      </v-card-text>
    </v-card>

    <PersonnelSelectModal v-model:open="selectOpen" @selected="onSelected" />
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import PersonnelSelectModal from '@/modules/personnel/PersonnelSelectModal.vue';
  const selectOpen = ref(false);
  const selected = ref<any>(null);
  const openSelect = () => (selectOpen.value = true);
  const onSelected = (item: any) => {
    selected.value = item;
  };
</script>
