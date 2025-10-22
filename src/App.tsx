import { useState, useEffect } from 'react'
import './App.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RecipeForm } from '@/components/RecipeForm'
import { RecipeList } from '@/components/RecipeList'
import { Flashcards } from '@/components/Flashcards'
import { MatchingGame } from '@/components/MatchingGame'
import { loadRecipes, saveRecipes } from '@/lib/storage'
import type { Recipe } from '@/types/recipe'
import { BookOpen, Gamepad2, GraduationCap, Plus } from 'lucide-react'

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [activeTab, setActiveTab] = useState('recipes')

  // Load recipes from localStorage on mount
  useEffect(() => {
    const loadedRecipes = loadRecipes()
    setRecipes(loadedRecipes)
  }, [])

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    saveRecipes(recipes)
  }, [recipes])

  const handleSaveRecipe = (recipeData: Omit<Recipe, 'id' | 'createdAt'>) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: `recipe-${Date.now()}`,
      createdAt: Date.now()
    }
    setRecipes([...recipes, newRecipe])
  }

  const handleDeleteRecipe = (id: string) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Recipe Memory Trainer</h1>
          <p className="text-muted-foreground">
            Learn and memorize your favorite recipes through interactive games and flashcards
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="recipes">
              <BookOpen className="h-4 w-4 mr-2" />
              Recipes
            </TabsTrigger>
            <TabsTrigger value="add">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </TabsTrigger>
            <TabsTrigger value="flashcards">
              <GraduationCap className="h-4 w-4 mr-2" />
              Flashcards
            </TabsTrigger>
            <TabsTrigger value="game">
              <Gamepad2 className="h-4 w-4 mr-2" />
              Game
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recipes" className="mt-6">
            <RecipeList recipes={recipes} onDelete={handleDeleteRecipe} />
          </TabsContent>

          <TabsContent value="add" className="mt-6">
            <RecipeForm onSave={handleSaveRecipe} />
          </TabsContent>

          <TabsContent value="flashcards" className="mt-6">
            <Flashcards recipes={recipes} />
          </TabsContent>

          <TabsContent value="game" className="mt-6">
            <MatchingGame recipes={recipes} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App
