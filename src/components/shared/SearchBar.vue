
<template>
  <div class="d-flex flex-column ga-2">
    <div class="d-flex align-center ga-2">
      <v-text-field v-model="keyword" variant="outlined" density="comfortable" hide-details placeholder="氏名・所属会社などで検索（Enterで実行）" prepend-inner-icon="mdi-magnify" @keyup.enter="onSearch" style="max-width:480px" />
      <v-btn color="primary" :loading="loading" prepend-icon="mdi-magnify" @click="onSearch">検索</v-btn>
      <v-btn variant="text" prepend-icon="mdi-arrow-collapse-vertical" @click="toggle">条件を折りたたむ/展開</v-btn>
      <v-btn variant="text" prepend-icon="mdi-eraser" @click="onReset">クリア</v-btn>
    </div>
    <v-expand-transition><div v-show="expanded" class="advanced-filter"><slot name="advanced" :close="() => (expanded = false)" /></div></v-expand-transition>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{ modelValue?: string; loading?: boolean }>();
const emit = defineEmits<{ (e:'update:modelValue', v?: string): void; (e:'search', q:{keyword?:string}): void; (e:'reset'): void; }>();
const keyword = ref(props.modelValue ?? ''); const expanded = ref(false);
watch(()=>props.modelValue,(v)=>keyword.value=v ?? '');
const onSearch=()=>emit('search',{keyword:keyword.value.trim()||undefined});
const onReset=()=>{ keyword.value=''; emit('update:modelValue',''); emit('reset'); };
const toggle=()=>expanded.value=!expanded.value;
</script>
