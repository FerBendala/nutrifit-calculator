'use client';

import { useCallback } from 'react';

const STORAGE_PREFIX = 'nutrifit-last-result-';

export function saveLastResult(calculatorKey: string, result: unknown) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(
      `${STORAGE_PREFIX}${calculatorKey}`,
      JSON.stringify({ result, timestamp: Date.now() })
    );
  } catch {
    // localStorage lleno o no disponible
  }
}

export function getLastResult<T>(calculatorKey: string): { result: T; timestamp: number } | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${calculatorKey}`);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    // Descartar resultados de mas de 30 dias
    if (Date.now() - parsed.timestamp > 30 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(`${STORAGE_PREFIX}${calculatorKey}`);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function useLastResult<T>(calculatorKey: string) {
  const save = useCallback(
    (result: T) => saveLastResult(calculatorKey, result),
    [calculatorKey]
  );

  const load = useCallback(
    () => getLastResult<T>(calculatorKey),
    [calculatorKey]
  );

  return { save, load };
}
