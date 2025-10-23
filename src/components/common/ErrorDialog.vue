
<template>
  <v-dialog v-model="model" width="480" :scrim="true" close-on-back close-on-esc>
    <v-card>
      <v-card-title class="text-error"><v-icon class="mr-2">mdi-alert-circle</v-icon>エラー</v-card-title>
      <v-card-text><slot>{{ message }}</slot></v-card-text>
      <v-card-actions><v-spacer /><v-btn color="primary" @click="model=false" prepend-icon="mdi-check">OK</v-btn></v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ open: boolean; message?: string }>();
const emit = defineEmits<{ (e:'update:open', v:boolean): void }>();
const model = computed({ get:()=>props.open, set:(v:boolean)=>emit('update:open', v) });
</script>
