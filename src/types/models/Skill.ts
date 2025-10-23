
import type { UUID } from '@/types/common';
export interface SkillItem { スキル名: string; スキル点数: number; }
export interface PersonnelSkillPayload { 人材ＩＤ: UUID; スキル: SkillItem[]; }
