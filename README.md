# Calculator App / Aplicación de Calculadora

A React + TypeScript calculator built with Vite. This app implements a polished calculator UI with dark theme, keyboard input, formatted values, and a clean component-based architecture.

Una calculadora construida con React + TypeScript y Vite. Esta app ofrece una interfaz de calculadora pulida con modo oscuro, entrada por teclado, valores formateados y una arquitectura limpia basada en componentes.

## Features / Características

- Responsive calculator UI with 4×5 button grid
- Display of current operation and formatted result
- Keyboard support for digits, operators, Enter, Backspace, Escape, and decimal point
- Custom font for the display (Arial)
- Maximum of 12 digits in the display including decimal input
- Reusable components and hook-based calculator logic
- Unit tests with Vitest and React Testing Library


## Live Preview

Run locally using:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Installation

```bash
cd calculator-app
npm install
```

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build locally
- `npm test` — run the test suite with Vitest
- `npm run lint` — run ESLint

## App Usage

1. Use the buttons or keyboard to enter numbers and operations.
2. Press `=` or Enter to calculate.
3. Use `Backspace` or `⌫` to delete the last digit.
4. Use `AC` to reset the calculator.

## Keyboard Shortcuts

- **Numbers (0-9)**: Input digits
- **Operators (+, -, *, /)**: Select operation
- **Enter** or **=**: Calculate result
- **Backspace** or **Delete**: Remove last digit
- **Escape** or **AC**: Clear calculator
- **.** or **,**: Decimal point

## Technologies Used

- **React 19** - UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **CSS Modules** - Scoped component styling

## File Structure

- `src/App.tsx` — top-level app component
- `src/components/Calculator.tsx` — main calculator container and interactions
- `src/components/Display.tsx` — display panel for current operation and value
- `src/components/ButtonGrid.tsx` — button grid renderer
- `src/components/CalculatorButton.tsx` — individual styled button component
- `src/hooks/useCalculator.ts` — calculator state and behavior hook
- `src/utils/calcUtils.ts` — formatting, parsing, and operator helpers
- `src/constants/buttonConfig.ts` — button layout definition
- `src/tests/` — unit and component tests

## Styling

The app uses CSS modules scoped to components and a global `index.css` for theme variables. The display uses Arial font family in a clean dark theme design.

## Testing

Run the full test suite:

```bash
npm test
```

The project includes tests for:

- Calculator logic (`src/tests/useCalculator.test.ts`)
- Component behavior and rendering (`src/tests/Calculator.test.tsx`)
- Utility helpers (`src/tests/calcUtils.test.ts`)
- Utility helpers (`src/tests/calcUtils.test.ts`)
