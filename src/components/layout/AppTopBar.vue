<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click="ui.toggleDrawer()" />
    <v-toolbar-title class="font-semibold">TMS Web Demo v2</v-toolbar-title>
    <v-spacer />

    <v-btn icon :title="ui.pinned ? 'ピン固定を解除' : 'ピン固定する'" @click="ui.togglePin()">
      <v-icon>{{ ui.pinned ? 'mdi-pin' : 'mdi-pin-outline' }}</v-icon>
    </v-btn>
    <v-btn icon :to="{ path: '/dashboard' }" title="Dashboard"
      ><v-icon>mdi-view-dashboard</v-icon></v-btn
    >
    <v-btn icon :to="{ path: '/personnel' }" title="人材管理"
      ><v-icon>mdi-account-multiple</v-icon></v-btn
    >
    <v-btn icon :to="{ path: '/questions' }" title="問題管理"><v-icon>mdi-book-open</v-icon></v-btn>

    <v-btn icon :to="{ path: '/exam-papers' }" title="試験用紙管理"
      ><v-icon>mdi-file-document-multiple</v-icon></v-btn
    >

    <v-btn icon :to="{ path: '/exam-runs' }" title="試験実施管理"
      ><v-icon>mdi-clipboard-text</v-icon></v-btn
    >
    <!-- <v-btn icon :to="{ path: '/exam-session' }" title="試験実施"
      ><v-icon>mdi-lead-pencil</v-icon></v-btn
    > -->
    <v-btn icon :to="{ path: '/proposal' }" title="要員提案"
      ><v-icon>mdi-account-search</v-icon></v-btn
    >

    <!-- <v-snackbar
      v-model="snackbarModel"
      location="top right"
      :timeout="3000"
      :color="toast.color.value"
      variant="tonal">
      {{ toast.message }}
    </v-snackbar> -->

    <v-snackbar
      v-model="snackbarModel"
      location="top right"
      :timeout="timeoutByType"
      class="app-snackbar"
      variant="plain"
      transition="slide-x-reverse-transition">
      <!-- 中身は今の v-alert カードでOK -->
      <v-alert
        :color="alertColor"
        :icon="iconByType"
        variant="elevated"
        border="start"
        :border-color="alertColor"
        density="comfortable"
        class="app-snackbar__alert">
        <div class="d-flex align-center ga-3">
          <div class="flex-grow-1">
            <div class="text-subtitle-2 font-weight-medium">
              {{ titleByType }}
            </div>
            <div class="text-body-2">
              {{ toast.message }}
            </div>
          </div>
          <v-btn icon variant="text" density="comfortable" @click="snackbarModel = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-alert>
    </v-snackbar>
  </v-app-bar>
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  import { useToastState } from '@/plugins/toast';
  import { useUiStore } from '@/store/useUiStore';
  const toast = useToastState();
  const snackbarModel = computed({
    get: () => toast.open.value,
    set: (v: boolean) => (toast.open.value = v),
  });
  const ui = useUiStore();

  // Vuetifyのカラーにマッピング（infoだけprimaryに寄せる）
  const alertColor = computed(() => {
    switch (toast.color.value) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'info':
      default:
        return 'primary';
    }
  });

  const titleByType = computed(() => {
    switch (toast.color.value) {
      case 'success':
        return '完了しました';
      case 'error':
        return 'エラーが発生しました';
      case 'info':
      default:
        return 'お知らせ';
    }
  });

  const iconByType = computed(() => {
    switch (toast.color.value) {
      case 'success':
        return 'mdi-check-circle';
      case 'error':
        return 'mdi-alert-circle';
      case 'info':
      default:
        return 'mdi-information';
    }
  });

  const timeoutByType = computed(() => (toast.color.value === 'error' ? 5000 : 3000));
</script>
<style scoped>
  /* .app-snackbar {
    max-width: 420px;
  } */

  .app-snackbar__alert {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(15, 23, 42, 0.35);
  }
</style>
