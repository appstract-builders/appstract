import { create } from "zustand";

type DraftMap = Record<string, string>;

type ProjectTextsAdminState = {
  slug: string | null;
  drafts: DraftMap;
  setSlug: (slug: string) => void;
  setDrafts: (drafts: DraftMap) => void;
  patchDraft: (key: string, value: string) => void;
  addEmptyRow: () => void;
  removeKey: (key: string) => void;
};

export const useProjectTextsAdminStore = create<ProjectTextsAdminState>((set) => ({
  slug: null,
  drafts: {},
  setSlug: (slug) => set({ slug }),
  setDrafts: (drafts) => set({ drafts: { ...drafts } }),
  patchDraft: (key, value) =>
    set((s) => {
      const next = { ...s.drafts };
      next[key] = value;
      return { drafts: next };
    }),
  addEmptyRow: () =>
    set((s) => {
      const next = { ...s.drafts };
      let n = 0;
      let candidate = "clave_nueva";
      while (next[candidate] !== undefined) {
        n += 1;
        candidate = `clave_nueva_${n}`;
      }
      next[candidate] = "";
      return { drafts: next };
    }),
  removeKey: (key) =>
    set((s) => {
      const next = { ...s.drafts };
      delete next[key];
      return { drafts: next };
    }),
}));
