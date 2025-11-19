<template>
  <v-dialog v-model="dialogModel" max-width="1100" scrollable>
    <v-card>
      <v-toolbar density="comfortable" color="primary" class="text-white">
        <v-toolbar-title>要員提案</v-toolbar-title>
        <v-spacer /><v-btn icon variant="text" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <ResourceProposalView :proposal="proposal" @save="onSaveInternal" />
      </v-card-text>
      <v-card-actions> <v-spacer /> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import ResourceProposalView from '@/views/ResourceProposalView.vue';
  import type { Proposal } from '@/types/models/Proposal';

  const props = defineProps<{
    open: boolean;
    proposal: Proposal | null;
  }>();

  const emit = defineEmits<{
    (e: 'update:open', v: boolean): void;
    (e: 'save', v: Proposal): void;
  }>();

  const dialogModel = computed({
    get: () => props.open,
    set: (v: boolean) => emit('update:open', v),
  });

  function close() {
    emit('update:open', false);
  }

  function onSaveInternal(p: Proposal) {
    emit('save', p);
  }
</script>
