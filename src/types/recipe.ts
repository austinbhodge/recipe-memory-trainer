export interface Ingredient {
  id: string
  name: string
  amount: string
  unit: string
}

export interface Recipe {
  id: string
  name: string
  description: string
  ingredients: Ingredient[]
  instructions: string[]
  createdAt: number
}
