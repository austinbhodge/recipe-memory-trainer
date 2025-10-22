import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import type { Recipe } from '@/types/recipe'

interface FlashcardsProps {
  recipes: Recipe[]
}

export function Flashcards({ recipes }: FlashcardsProps) {
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  if (recipes.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Add some recipes first to practice with flashcards!
          </p>
        </CardContent>
      </Card>
    )
  }

  const currentRecipe = recipes[currentRecipeIndex]
  const currentIngredient = currentRecipe.ingredients[currentCardIndex]

  const nextCard = () => {
    setShowAnswer(false)
    if (currentCardIndex < currentRecipe.ingredients.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    } else if (currentRecipeIndex < recipes.length - 1) {
      setCurrentRecipeIndex(currentRecipeIndex + 1)
      setCurrentCardIndex(0)
    }
  }

  const previousCard = () => {
    setShowAnswer(false)
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
    } else if (currentRecipeIndex > 0) {
      setCurrentRecipeIndex(currentRecipeIndex - 1)
      setCurrentCardIndex(recipes[currentRecipeIndex - 1].ingredients.length - 1)
    }
  }

  const restart = () => {
    setCurrentRecipeIndex(0)
    setCurrentCardIndex(0)
    setShowAnswer(false)
  }

  const isFirstCard = currentRecipeIndex === 0 && currentCardIndex === 0
  const isLastCard =
    currentRecipeIndex === recipes.length - 1 &&
    currentCardIndex === currentRecipe.ingredients.length - 1

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Flashcards</CardTitle>
            <Button variant="outline" size="sm" onClick={restart}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Restart
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Recipe: {currentRecipe.name} ({currentRecipeIndex + 1}/{recipes.length})
          </p>
          <p className="text-sm text-muted-foreground">
            Ingredient {currentCardIndex + 1} of {currentRecipe.ingredients.length}
          </p>
        </CardHeader>
        <CardContent>
          <div
            className="min-h-[300px] flex items-center justify-center cursor-pointer rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors p-8"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <div className="text-center">
              {!showAnswer ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Question</p>
                  <h3 className="text-3xl font-bold">
                    What is ingredient #{currentCardIndex + 1}?
                  </h3>
                  <p className="text-muted-foreground mt-4">Click to reveal</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Answer</p>
                  <h3 className="text-4xl font-bold">{currentIngredient.name}</h3>
                  <p className="text-2xl text-muted-foreground">
                    {currentIngredient.amount} {currentIngredient.unit}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={previousCard}
              disabled={isFirstCard}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              Card {currentRecipeIndex * currentRecipe.ingredients.length + currentCardIndex + 1} of {recipes.reduce((acc, r) => acc + r.ingredients.length, 0)}
            </div>
            <Button
              variant="outline"
              onClick={nextCard}
              disabled={isLastCard}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
