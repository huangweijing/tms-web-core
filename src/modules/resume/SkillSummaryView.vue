<template>
  <v-container class="pa-0">
    <!-- 一言集約 -->
    <v-card class="mb-4">
      <v-card-title class="d-flex align-center">
        <!-- <v-icon class="mr-2">mdi-bullseye</v-icon> -->
        一言要約
      </v-card-title>
      <v-card-text>
        {{ data['一言集約'] }}
      </v-card-text>
    </v-card>

    <v-row dense>
      <!-- 左：強み領域 -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="d-flex align-center">
            <!-- <v-icon class="mr-2">mdi-star-box</v-icon> -->
            最も得意な領域
          </v-card-title>
          <v-card-text>
            {{ data['一番得意な領域'] }}
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-title class="d-flex align-center">
            <!-- <v-icon class="mr-2">mdi-shield-star</v-icon> -->
            強み（領域別）
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row dense>
              <v-col cols="12" v-for="(s, i) in data['強み領域']" :key="'s' + i">
                <v-sheet class="pa-3 rounded-lg border">
                  <v-chip :key="'g' + i" class="ma-1" variant="tonal" color="primary" size="small">
                    {{ s.領域 }}
                  </v-chip>
                  <!-- <div class="text-subtitle-2 font-weight-medium">{{ s.領域 }}</div> -->
                  <div class="text-body-2 mt-1">{{ s.理由 }}</div>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 右：一番得意 / アサイン適正 -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="d-flex align-center">
            <!-- <v-icon class="mr-2">mdi-briefcase-check</v-icon> -->
            アサイン適性
          </v-card-title>
          <v-card-text>
            <div v-if="!data['アサイン適正']?.length" class="text-disabled">—</div>
            <div v-else class="d-flex flex-wrap">
              <v-chip
                v-for="(a, i) in data['アサイン適正']"
                :key="'a' + i"
                class="ma-1"
                variant="tonal"
                color="primary"
                size="small">
                {{ a }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-title class="d-flex align-center">
            <!-- <v-icon class="mr-2">mdi-rocket-launch</v-icon> -->
            強化が効果的な領域
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row dense>
              <v-col cols="12" v-for="(g, i) in data['伸ばすと効く']" :key="'g' + i">
                <v-sheet class="pa-3 rounded-lg border">
                  <v-chip :key="'g' + i" class="ma-1" variant="tonal" color="primary" size="small">
                    {{ g.領域 }}
                  </v-chip>
                  <!-- <div class="text-subtitle-2 font-weight-medium">{{ g.領域 }}</div> -->
                  <div class="text-body-2 mt-1">{{ g.理由 }}</div>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- スキル評価 -->
    <v-card class="section-gap mt-4">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-chart-bar</v-icon>
        スキル評価
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="sortedSkills"
          item-key="スキル名"
          class="elevation-0"
          :page="page"
          :items-per-page="pageSize"
          :items-per-page-options="[5, 10, 20, 100]"
          items-per-page-text="表示件数"
          density="comfortable">
          <template #item.bar="{ item }">
            <div class="d-flex align-center" style="min-width: 200px; max-width: 420px">
              <v-progress-linear
                :model-value="item.点数"
                height="12"
                rounded
                color="primary"
                class="flex-grow-1 mr-2" />
              <!-- <span class="text-caption">{{ item.点数 }}/{{ 100 }}</span> -->
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import type { SkillSummary, SkillScore } from '../../types/models/SkillSummary';
  import type { DataTableHeader } from 'vuetify';

  const props = defineProps<{ skillSummary: SkillSummary }>();

  const data = computed(() => props.skillSummary);

  const headers: DataTableHeader[] = [
    { title: 'スキル', key: 'スキル名' },
    { title: '点数', key: '点数', width: 90, align: 'end' },
    { title: '評価', key: 'bar', align: 'start', width: 320 },
  ];

  const page = ref(1);
  const pageSize = ref(10);

  const sortedSkills = computed<SkillScore[]>(() => {
    if (data && data.value['スキル採点']) {
    }
    const arr = [...(data.value['スキル採点'] || [])];
    arr.sort((a, b) => b.点数 - a.点数);
    return arr;
  });
</script>

<style scoped>
  .border {
    border: 1px solid #e5e7eb;
  }
</style>
