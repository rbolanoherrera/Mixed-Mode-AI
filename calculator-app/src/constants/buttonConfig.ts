export interface ButtonConfig {
  label: string;
  type: 'number' | 'operator' | 'clear' | 'equals' | 'special';
}

const buttonConfig: ButtonConfig[] = [
  { label: 'AC', type: 'clear' },
  { label: '⌫', type: 'special' },
  { label: '%', type: 'operator' },
  { label: '÷', type: 'operator' },
  { label: '7', type: 'number' },
  { label: '8', type: 'number' },
  { label: '9', type: 'number' },
  { label: '×', type: 'operator' },
  { label: '4', type: 'number' },
  { label: '5', type: 'number' },
  { label: '6', type: 'number' },
  { label: '−', type: 'operator' },
  { label: '1', type: 'number' },
  { label: '2', type: 'number' },
  { label: '3', type: 'number' },
  { label: '+', type: 'operator' },
  { label: '±', type: 'special' },
  { label: '0', type: 'number' },
  { label: '.', type: 'special' },
  { label: '=', type: 'equals' },
];

export default buttonConfig;