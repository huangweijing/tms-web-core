import { Proposal } from '@/types/models/Proposal';
import { defineStore } from 'pinia';

const SAMPLE_PROPOSAL: Proposal[] = [
  {
    提案ID: 'f8b92b3a-7c5b-4b1c-a8b0-dc1f8a7d1b62',
    提案名: 'ECサイト保守開発 要員提案',
    募集要項:
      '自社ECサイトの保守開発案件です。Java / Spring Boot を用いたサーバサイド開発と、Vue / TypeScript によるフロントエンド改修が主な業務です。',
    対象人材: [],
  },
  {
    提案ID: '38d0a0f8-9e32-4ab5-8c62-3b44084d3e07',
    提案名: '業務システム刷新プロジェクト 要員提案',
    募集要項:
      '基幹業務システム刷新案件における要員提案です。要件定義〜結合テストまでをリードできるPM/PLクラスの人材を想定しています。',
    対象人材: [],
  },
];

export const useProposalStore = defineStore('proposal', {
  state: () => ({
    items: [...SAMPLE_PROPOSAL] as Proposal[],
  }),
  getters: {
    byId: (s) => (id: string) => s.items.find((v) => v.提案ID === id),
  },
  actions: {
    setAll(rows: Proposal[]) {
      this.items = rows;
    },
    upsert(row: Proposal) {
      const i = this.items.findIndex((x) => x.提案ID === row.提案ID);
      if (i >= 0) this.items.splice(i, 1, row);
      else this.items.push(row);
    },
    remove(id: string) {
      const i = this.items.findIndex((x) => x.提案ID === id);
      if (i >= 0) this.items.splice(i, 1);
    },
  },
  persist: true,
});
