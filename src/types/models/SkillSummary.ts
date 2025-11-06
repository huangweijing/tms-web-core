export interface Strength {
  領域: string;
  理由: string;
}
export interface SkillScore {
  スキル名: string;
  点数: number;
}
export interface SkillSummary {
  一言集約?: string;
  強み領域?: Strength[];
  一番得意な領域?: string;
  アサイン適正?: string[];
  伸ばすと効く?: Strength[];
  スキル採点?: SkillScore[];
}
