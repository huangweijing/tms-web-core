<template>
  <div class="p-4">
    <h2 class="text-h5 mb-4">
      <v-icon class="mr-2">mdi-view-dashboard</v-icon> ダッシュボード（スタブ）
    </h2>
    <v-card class="mb-4"><v-card-text>左のナビから各画面へ移動してください。</v-card-text></v-card>

    <v-card class="mb-4">
      <v-card-title class="d-flex align-center ga-2">
        <v-icon>mdi-eye</v-icon> 人材参照モード（モーダル）デモ <v-spacer /><v-btn
          color="primary"
          prepend-icon="mdi-magnify"
          @click="openSelectPersonnel"
          >人材を選択</v-btn
        >
      </v-card-title>
      <v-card-text>
        <div v-if="selectedPersonnel">
          選択結果：<strong>{{ selectedPersonnel.名前 }}</strong
          >（{{ selectedPersonnel.所属会社 }} / {{ selectedPersonnel.社員番号 }}）
        </div>
        <div v-else>未選択</div>
      </v-card-text>
    </v-card>

    <v-card class="mb-4">
      <v-card-title class="d-flex align-center ga-2">
        <v-icon>mdi-eye</v-icon> 問題参照モード（モーダル）デモ <v-spacer /><v-btn
          color="primary"
          prepend-icon="mdi-magnify"
          @click="openSelectQuestion"
          >問題を選択</v-btn
        >
      </v-card-title>
      <v-card-text>
        <div v-if="selectedQuestion">
          選択結果：<strong>{{ selectedQuestion.問題文章 }}</strong
          >（{{ selectedQuestion.問題ＩＤ }} / {{ selectedQuestion.スキル }}）
        </div>
        <div v-else>未選択</div>
      </v-card-text>
    </v-card>

    <PersonnelSelectModal v-model:open="selectOpenPersonnel" @selected="onSelectedPersonnel" />
    <QuestionListDialog
      v-model:open="selectOpenQuestion"
      mode="select"
      @selected="onSelectedQuestion"
    />
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import PersonnelSelectModal from '@/modules/personnel/PersonnelSelectModal.vue';
  import QuestionListDialog from '@/modules/exam/QuestionListDialog.vue';
  const selectOpenPersonnel = ref(false);
  const selectedPersonnel = ref<any>(null);
  const openSelectPersonnel = () => (selectOpenPersonnel.value = true);
  const onSelectedPersonnel = (item: any) => {
    selectedPersonnel.value = item;
  };
  const selectOpenQuestion = ref(false);
  const selectedQuestion = ref<any>(null);
  const openSelectQuestion = () => (selectOpenQuestion.value = true);
  const onSelectedQuestion = (item: any) => {
    selectedQuestion.value = item;
  };
</script>
