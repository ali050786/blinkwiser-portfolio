"use client";

import { create } from "zustand";

const STORAGE_KEY = "portfolio-visited-cases";

function readStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : [];
  } catch {
    return [];
  }
}

function writeStorage(slugs: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {}
}

interface VisitedState {
  visited: string[];
  hydrated: boolean;
  hydrate: () => void;
  markVisited: (slug: string) => void;
}

export const useVisitedCases = create<VisitedState>((set, get) => ({
  visited: [],
  hydrated: false,
  hydrate: () => {
    if (get().hydrated) return;
    set({ visited: readStorage(), hydrated: true });
  },
  markVisited: (slug: string) => {
    const { visited } = get();
    if (visited.includes(slug)) return;
    const next = [...visited, slug];
    writeStorage(next);
    set({ visited: next });
  },
}));
