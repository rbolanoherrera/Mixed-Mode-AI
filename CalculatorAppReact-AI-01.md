## Steps
1. Initialize a Vite React + TypeScript project and verify it runs.
2. Create a top-level `Calculator` page with a top display and 4×5 button grid.
3. Build reusable components: `Display`, `ButtonGrid`, `CalculatorButton`.
4. Add layout + CSS: centered card, minimal styling, responsive button grid.
5. Separate calculator logic into `useCalculator`, `calcUtils`, and button constants.
6. Add basic tests for state/value updates, button interaction, and utility functions.

## Project setup
- `npm create vite@latest calculator-app -- --template react-ts`
- `cd calculator-app`
- `npm install`
- `npm run dev`

## File structure
- `src/App.tsx`
- `src/main.tsx`
- `src/styles.css`

- `src/components/Calculator.tsx`
- `src/components/Display.tsx`
- `src/components/ButtonGrid.tsx`
- `src/components/CalculatorButton.tsx`

- `src/hooks/useCalculator.ts`
- `src/utils/calcUtils.ts`
- `src/constants/buttonConfig.ts`

- `src/tests/useCalculator.test.ts`
- `src/tests/calcUtils.test.ts`
- `src/tests/Calculator.test.tsx`

## Layout & CSS
- `Calculator` container: centered card, subtle shadow, fixed max-width.
- `Display`: top-aligned, right-aligned text, larger font for result.
- `ButtonGrid`: 4 columns × 5 rows with exact order:
  - `AC`, backspace, `%`, `÷`
  - `7`, `8`, `9`, `×`
  - `4`, `5`, `6`, `−`
  - `1`, `2`, `3`, `+`
  - `±`, `0`, `.`, `=`
- `CalculatorButton`: consistent sizing, hover state, operator accent colors.
- Minimal CSS in `src/styles.css` for spacing, card layout, font, and button grid.

## Constants and logic separation
- `buttonConfig.ts`: exact button list, labels, types, and optional variant metadata.
- `useCalculator.ts`: manages `displayValue`, `operator`, `previousValue`, and actions.
- `calcUtils.ts`: formatting, operator mapping, safe evaluation, input normalization.
- `CalculatorButton`: low-level reusable button component.
- `ButtonGrid`: uses `buttonConfig` constant to render exact layout.

## Testing
- `useCalculator.test.ts`: verify input digits, operators, clear, backspace, percent, plus/minus, decimal, equals.
- `calcUtils.test.ts`: verify formatting, expression handling, and result evaluation.
- `Calculator.test.tsx`: render layout, display content, button click behavior, and grid order.

## Next steps
- Wire the display and buttons through `useCalculator`.
- Ensure the exact screenshot layout and button order are rendered.
- Validate styling on desktop and mobile widths.
- Add keyboard support if desired.
- Optionally extend features later: history, scientific functions, or theme switch.