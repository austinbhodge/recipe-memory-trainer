import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RotateCcw, Trophy } from 'lucide-react'
import type { Recipe } from '@/types/recipe'

interface MatchingGameProps {
  recipes: Recipe[]
}

interface GameCard {
  id: string
  content: string
  type: 'ingredient' | 'amount'
  matchId: string
  isMatched: boolean
}

export function MatchingGame({ recipes }: MatchingGameProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [cards, setCards] = useState<GameCard[]>([])
  const [selectedCards, setSelectedCards] = useState<GameCard[]>([])
  const [matches, setMatches] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const initializeGame = (recipe: Recipe) => {
    setSelectedRecipe(recipe)

    // Create pairs of cards
    const gameCards: GameCard[] = []

    recipe.ingredients.forEach((ingredient) => {
      gameCards.push({
        id: `ing-${ingredient.id}`,
        content: ingredient.name,
        type: 'ingredient',
        matchId: ingredient.id,
        isMatched: false
      })

      gameCards.push({
        id: `amt-${ingredient.id}`,
        content: `${ingredient.amount} ${ingredient.unit}`,
        type: 'amount',
        matchId: ingredient.id,
        isMatched: false
      })
    })

    // Shuffle cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setSelectedCards([])
    setMatches(0)
    setAttempts(0)
  }

  useEffect(() => {
    if (recipes.length > 0 && !selectedRecipe) {
      initializeGame(recipes[0])
    }
  }, [recipes])

  const handleCardClick = (card: GameCard) => {
    if (card.isMatched || selectedCards.length >= 2 || selectedCards.some(c => c.id === card.id)) {
      return
    }

    const newSelected = [...selectedCards, card]
    setSelectedCards(newSelected)

    if (newSelected.length === 2) {
      setAttempts(attempts + 1)

      if (newSelected[0].matchId === newSelected[1].matchId && newSelected[0].type !== newSelected[1].type) {
        // Match found!
        setTimeout(() => {
          setCards(cards.map(c =>
            c.matchId === newSelected[0].matchId ? { ...c, isMatched: true } : c
          ))
          setMatches(matches + 1)
          setSelectedCards([])
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setSelectedCards([])
        }, 1000)
      }
    }
  }

  const resetGame = () => {
    if (selectedRecipe) {
      initializeGame(selectedRecipe)
    }
  }

  if (recipes.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Add some recipes first to play the matching game!
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!selectedRecipe) {
    return null
  }

  const totalPairs = selectedRecipe.ingredients.length
  const isGameComplete = matches === totalPairs

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Matching Game</CardTitle>
              <CardDescription className="mt-1">Match ingredients with their measurements</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={resetGame}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Recipe Selector */}
            <div className="flex gap-2 flex-wrap">
              {recipes.map((recipe) => (
                <Button
                  key={recipe.id}
                  variant={selectedRecipe?.id === recipe.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => initializeGame(recipe)}
                >
                  {recipe.name}
                </Button>
              ))}
            </div>

            {/* Stats */}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Matches: {matches}/{totalPairs}
              </span>
              <span className="text-muted-foreground">
                Attempts: {attempts}
              </span>
            </div>

            {/* Game Complete */}
            {isGameComplete && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-bold text-lg">Congratulations!</h3>
                <p className="text-sm text-muted-foreground">
                  You completed the game in {attempts} attempts!
                </p>
              </div>
            )}

            {/* Game Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {cards.map((card) => {
                const isSelected = selectedCards.some(c => c.id === card.id)
                const isMatched = card.isMatched

                return (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card)}
                    disabled={isMatched}
                    className={`
                      min-h-[80px] p-3 rounded-lg border-2 transition-all text-sm font-medium
                      ${isMatched ? 'bg-primary/20 border-primary text-primary cursor-default' : ''}
                      ${isSelected && !isMatched ? 'bg-accent border-accent-foreground scale-95' : ''}
                      ${!isMatched && !isSelected ? 'bg-card hover:bg-accent border-border hover:border-accent-foreground cursor-pointer' : ''}
                    `}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <span className="text-xs text-muted-foreground mb-1">
                        {card.type === 'ingredient' ? 'Ingredient' : 'Amount'}
                      </span>
                      <span className="text-center break-words">
                        {card.content}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
