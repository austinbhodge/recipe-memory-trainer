import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import type { Recipe } from '@/types/recipe'

interface RecipeListProps {
  recipes: Recipe[]
  onDelete: (id: string) => void
}

export function RecipeList({ recipes, onDelete }: RecipeListProps) {
  if (recipes.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No recipes yet. Add your first recipe to get started!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {recipes.map((recipe) => (
        <Card key={recipe.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle>{recipe.name}</CardTitle>
                {recipe.description && (
                  <CardDescription className="mt-1">{recipe.description}</CardDescription>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(recipe.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Ingredients ({recipe.ingredients.length})</h4>
                <ul className="space-y-1">
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.id} className="text-sm text-muted-foreground">
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>
              {recipe.instructions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Instructions</h4>
                  <ol className="space-y-1 list-decimal list-inside">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
