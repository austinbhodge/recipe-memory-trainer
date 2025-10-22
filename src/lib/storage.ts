import type { Recipe } from '@/types/recipe'

const STORAGE_KEY = 'recipe-memory-trainer-recipes'

export function loadRecipes(): Recipe[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load recipes from storage:', error)
  }
  return []
}

export function saveRecipes(recipes: Recipe[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
  } catch (error) {
    console.error('Failed to save recipes to storage:', error)
  }
}
