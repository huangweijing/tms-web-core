<template>
  <v-dialog v-model="openSync" max-width="720">
    <v-card>
      <v-card-title class="d-flex align-center bg-primary text-white">
        <v-icon class="mr-2">mdi-content-save-cog</v-icon>
        保存対象の選択
        <v-spacer />
        <v-btn icon variant="text" @click="close"
          ><v-icon class="text-white">mdi-close</v-icon></v-btn
        >
      </v-card-title>

      <v-card-text>
        <v-alert type="warning" variant="tonal" class="mb-3">
          「AIスキル採点結果」を保存すると
          <strong>人材の既存スキルデータは完全に上書き</strong> されます。
        </v-alert>

        <v-list lines="one">
          <v-list-item>
            <template #prepend>
              <v-checkbox-btn v-model="form.basic" />
            </template>
            <v-list-item-title>人材基本情報</v-list-item-title>
            <v-list-item-subtitle>氏名、誕生年月に経歴データから上書き</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <template #prepend>
              <v-checkbox-btn v-model="form.resume" />
            </template>
            <v-list-item-title>経歴データ</v-list-item-title>
            <v-list-item-subtitle>学歴・職務経歴などの経歴本体</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <template #prepend>
              <v-checkbox-btn v-model="form.analysis" />
            </template>
            <v-list-item-title>AI分析結果</v-list-item-title>
            <v-list-item-subtitle>一言集約・強み・適正などの要約データ</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <template #prepend>
              <v-checkbox-btn v-model="form.skillScores" />
            </template>
            <v-list-item-title>AIスキル採点結果</v-list-item-title>
            <v-list-item-subtitle
              >人材の既存スキルデータに<strong>完全上書き</strong></v-list-item-subtitle
            >
          </v-list-item>
        </v-list>

        <v-overlay v-model="saving" contained persistent />
      </v-card-text>

      <v-divider />

      <v-card-actions class="justify-end">
        <v-btn variant="text" prepend-icon="mdi-close" @click="close">キャンセル</v-btn>
        <v-btn
          color="primary"
          prepend-icon="mdi-content-save"
          :disabled="!canSave"
          :loading="saving"
          @click="onSave"
          >保存</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { ref, computed, watch, toRefs } from 'vue';
  import type { SaveSelections } from '@/types/models/Resume';

  const props = defineProps<{
    open: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
    (e: 'saved', selections: SaveSelections): void;
  }>();

  const openSync = ref(props.open);
  watch(
    () => props.open,
    (v) => (openSync.value = v)
  );
  watch(openSync, (v) => emit('update:open', v));

  const form = ref<SaveSelections>({
    basic: true,
    resume: true,
    analysis: false,
    skillScores: false,
  });

  const saving = ref(false);

  const canSave = computed(() => {
    const anyChecked =
      form.value.basic || form.value.resume || form.value.analysis || form.value.skillScores;
    return anyChecked && !saving.value;
  });

  function close() {
    openSync.value = false;
  }

  async function onSave() {
    if (!canSave.value) return;
    saving.value = true;
    await new Promise((r) => setTimeout(r, 700));
    emit('saved', form.value);
    saving.value = false;
    close();
  }
</script>
