# Recipe Memory Trainer

A React application built with TypeScript and Shadcn UI to help you memorize recipes through interactive flashcards and games.

## Features

- **Recipe Management**: Add, view, and delete recipes with ingredients and instructions
- **Flashcards**: Practice memorizing recipe ingredients with interactive flashcards
- **Matching Game**: Match ingredients with their measurements in a fun game
- **Local Storage**: All recipes are automatically saved to your browser's local storage

## Technologies Used

- React 18
- TypeScript
- Vite
- Shadcn UI
- Tailwind CSS
- Lucide React Icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Use

1. **Add Recipes**: Click on the "Add" tab to create a new recipe with ingredients and optional instructions
2. **View Recipes**: The "Recipes" tab shows all your saved recipes
3. **Practice with Flashcards**: Use the "Flashcards" tab to test your memory of recipe ingredients
4. **Play Matching Game**: The "Game" tab offers a fun matching game to reinforce your learning

## Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── RecipeForm.tsx   # Form to add new recipes
│   ├── RecipeList.tsx   # Display list of recipes
│   ├── Flashcards.tsx   # Flashcard learning component
│   └── MatchingGame.tsx # Matching game component
├── lib/
│   ├── utils.ts         # Utility functions
│   └── storage.ts       # Local storage helpers
├── types/
│   └── recipe.ts        # TypeScript types
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## License

MIT
