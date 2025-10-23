
import type { ApiListResult } from '@/types/api';
import type { Personnel } from '@/types/models/Personnel';
import type { PersonnelSkillPayload, SkillItem } from '@/types/models/Skill';

const PERSONNEL: Personnel[] = [{"人材ID": "b9fcb3b2-6d88-41b7-b5b4-2f1d6b24cf32", "所属会社": "ABCソリューション株式会社", "名前": "山田 太郎", "社員番号": "A1001", "生年月日": "19900415", "現案件終了年月日": "20251231", "BPフラグ": 0}, {"人材ID": "f2cdd908-4a2e-4e61-9a2d-73f7a38c72a1", "所属会社": "DEFテクノロジーズ株式会社", "名前": "佐藤 花子", "社員番号": "A1002", "生年月日": "19870620", "現案件終了年月日": "20250630", "BPフラグ": 0}, {"人材ID": "6b5cc053-2682-4f14-9b62-05611b78d74f", "所属会社": "GHIシステムズ株式会社", "名前": "鈴木 一郎", "社員番号": "A1003", "生年月日": "19921005", "現案件終了年月日": "20250430", "BPフラグ": 0}, {"人材ID": "c6e72e4e-22b5-437b-b0d7-6a88290eb2b1", "所属会社": "JKLソフトウェア合同会社", "名前": "高橋 美咲", "社員番号": "A1004", "生年月日": "19981125", "現案件終了年月日": "20250715", "BPフラグ": 0}, {"人材ID": "e2ac3f3f-9827-49d7-b463-c7889c80e3a2", "所属会社": "MNOエンジニアリング株式会社", "名前": "田中 健", "社員番号": "A1005", "生年月日": "19891210", "現案件終了年月日": "20260331", "BPフラグ": 0}] as any;
const SKILL_OPTIONS = ['Java','Spring Boot','Vue.js','TypeScript','SQL','Python','Docker','Kubernetes'];
const SKILLS: Record<string, SkillItem[]> = {
  'c3b9c8c4-1d9f-4b68-9d79-6cfdf843a93e': [
    { スキル名: 'Java', スキル点数: 85 },
    { スキル名: 'Spring Boot', スキル点数: 78 },
    { スキル名: 'Vue.js', スキル点数: 88 },
    { スキル名: 'TypeScript', スキル点数: 80 },
    { スキル名: 'SQL', スキル点数: 92 }
  ]
};

function delay<T>(data: T, ms = 800): Promise<T> { return new Promise((resolve) => setTimeout(() => resolve(data), ms)); }

export async function listPersonnel(keyword?: string, page = 1, pageSize = 10): Promise<ApiListResult<Personnel>> {
  const filtered = (keyword
    ? PERSONNEL.filter((p) => [p.名前, p.所属会社, p.社員番号].some((v) => v?.toLowerCase().includes((keyword||'').toLowerCase())))
    : PERSONNEL
  );
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);
  return delay({ items, total: filtered.length });
}
export async function getPersonnel(id: string): Promise<Personnel | undefined> { return delay(PERSONNEL.find((p) => p.人材ID === id)); }
export async function createPersonnel(p: Omit<Personnel, '人材ID'>): Promise<Personnel> {
  const newItem: Personnel = { ...p, 人材ID: (crypto.randomUUID?crypto.randomUUID():Math.random().toString(36).slice(2)) } as Personnel;
  (PERSONNEL as any).unshift(newItem);
  return delay(newItem, 1200);
}
export async function updatePersonnel(p: Personnel): Promise<Personnel> { const idx = PERSONNEL.findIndex((x) => x.人材ID === p.人材ID); if (idx >= 0) PERSONNEL[idx] = p; return delay(p, 1200); }
export async function deletePersonnel(id: string): Promise<void> { const idx = PERSONNEL.findIndex((x) => x.人材ID === id); if (idx >= 0) PERSONNEL.splice(idx, 1); return delay(undefined as any, 800); }

export async function listSkillOptions(): Promise<string[]> { return delay(SKILL_OPTIONS.slice()); }
export async function getSkillsByPersonnelId(id: string): Promise<SkillItem[]> { return delay(SKILLS[id] ? [...SKILLS[id]] : []); }
export async function saveSkills(payload: PersonnelSkillPayload): Promise<void> { SKILLS[payload.人材ＩＤ] = payload.スキル.map((s)=>({...s})); return delay(undefined as any, 1200); }
