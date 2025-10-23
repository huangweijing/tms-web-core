import type { UUID } from '@/types/common';
export interface Choice {
  選択肢ＩＤ: UUID;
  選択肢文章: string;
  回答理由: string;
}
export interface Question {
  問題ＩＤ: UUID;
  問題文章: string;
  難易度: number;
  スキル: string;
  模範回答: UUID | null;
  模範回答理由: string;
  自動生成フラグ: 0 | 1;
  削除フラグ?: 0 | 1;
  選択肢: Choice[];
}
