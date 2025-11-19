<template>
  <div class="d-flex flex-column ga-4">
    <v-card>
      <v-card-title class="d-flex align-center ga-2">
        <v-icon>mdi-clipboard-multiple-outline</v-icon>
        要員提案一覧
      </v-card-title>
      <v-card-text>
        <SearchBar v-model="keyword" :loading="loading" @search="onSearch" @reset="onReset" />
        <div class="mt-4">
          <template v-if="loading">
            <v-skeleton-loader type="table" />
          </template>
          <template v-else>
            <v-data-table
              :headers="headers"
              :items="items"
              item-key="提案ID"
              class="elevation-1 rounded-lg"
            >
              <template #top>
                <div class="d-flex justify-end pa-2">
                  <v-btn
                    color="primary"
                    prepend-icon="mdi-plus"
                    @click="openNew"
                  >
                    新規作成
                  </v-btn>
                </div>
              </template>
              <template #item.提案ID="{ item }">
                <span class="font-mono text-body-2">{{ item.提案ID }}</span>
              </template>
              <template #item.募集要項="{ item }">
                <span class="text-body-2 text-truncate d-inline-block" style="max-width: 320px">
                  {{ item.募集要項 }}
                </span>
              </template>
              <template #item.actions="{ item }">
                <div class="d-flex ga-2">
                  <v-btn
                    size="small"
                    color="primary"
                    prepend-icon="mdi-pencil"
                    @click.stop="openEdit(item)"
                  >
                    編集
                  </v-btn>
                  <v-btn
                    size="small"
                    color="error"
                    prepend-icon="mdi-delete"
                    :loading="deletingId === item.提案ID"
                    @click.stop="onDelete(item)"
                  >
                    削除
                  </v-btn>
                </div>
              </template>
            </v-data-table>
          </template>
        </div>
      </v-card-text>
    </v-card>

    <ProposalEditorModal
      v-model:open="editorOpen"
      :proposal="editing"
      @save="onSavedFromEditor"
    />
    <ErrorDialog v-model:open="errorOpen" :message="errorMessage" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SearchBar from '@/components/shared/SearchBar.vue';
import ErrorDialog from '@/components/common/ErrorDialog.vue';
import ProposalEditorModal from '@/modules/proposal/ProposalEditorModal.vue';
import { useToast } from '@/plugins/toast';
import type { Proposal } from '@/types/models/Proposal';
import { deleteProposal, listProposals, saveProposal } from '@/composables/useApi';

const toast = useToast();

const keyword = ref('');
const loading = ref(true);
const items = ref<Proposal[]>([]);
const errorOpen = ref(false);
const errorMessage = ref('');

const editorOpen = ref(false);
const editing = ref<Proposal | null>(null);
const deletingId = ref<string | null>(null);

const headers = [
  { title: '提案ID', key: '提案ID', width: 260 },
  { title: '提案名', key: '提案名' },
  { title: '募集要項', key: '募集要項', sortable: false },
  { title: '操作', key: 'actions', sortable: false, width: 200 },
];

onMounted(fetchList);

async function fetchList() {
  try {
    loading.value = true;
    items.value = await listProposals(keyword.value || undefined);
  } catch (e) {
    errorMessage.value = '提案一覧の取得に失敗しました';
    errorOpen.value = true;
  } finally {
    loading.value = false;
  }
}

function onSearch(q: { keyword?: string }) {
  keyword.value = q.keyword ?? '';
  fetchList();
}

function onReset() {
  keyword.value = '';
  fetchList();
}

function openNew() {
  editing.value = {
    提案ID: generateUuid(),
    提案名: '',
    募集要項: '',
  };
  editorOpen.value = true;
}

function openEdit(item: Proposal) {
  editing.value = { ...item };
  editorOpen.value = true;
}

async function onSavedFromEditor(p: Proposal) {
  try {
    await saveProposal(p);
    toast.show('提案を保存しました', 'success');
    editorOpen.value = false;
    await fetchList();
  } catch (e) {
    errorMessage.value = '提案の保存に失敗しました';
    errorOpen.value = true;
  }
}

async function onDelete(item: Proposal) {
  if (!confirm('選択した提案を削除してよろしいですか？')) return;
  try {
    deletingId.value = item.提案ID;
    await deleteProposal(item.提案ID);
    toast.show('提案を削除しました', 'success');
    await fetchList();
  } catch (e) {
    errorMessage.value = '提案の削除に失敗しました';
    errorOpen.value = true;
  } finally {
    deletingId.value = null;
  }
}

function generateUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
</script>
