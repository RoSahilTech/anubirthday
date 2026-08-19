/**
 * Storage Utility
 * Safe localStorage wrapper with memory fallback if storage is disabled/unavailable
 */

const STORAGE_KEY = 'ANUSHKA_BIRTHDAY_QUEST_V1';

const inMemoryStore = {};

export const getStorageData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('localStorage read failed, falling back to memory store', e);
    return inMemoryStore[STORAGE_KEY] || null;
  }
};

export const saveStorageData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('localStorage write failed, using memory store', e);
    inMemoryStore[STORAGE_KEY] = data;
  }
};

export const clearStorageData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    delete inMemoryStore[STORAGE_KEY];
  }
};
