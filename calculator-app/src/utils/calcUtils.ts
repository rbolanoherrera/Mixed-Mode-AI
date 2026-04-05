// Utility functions for calculator

export const formatDisplayValue = (value: string): string => {
  // Remove trailing zeros after decimal
  if (value.includes('.')) {
    return value.replace(/\.?0+$/, '');
  }
  return value;
};

export const stripGroupingSeparators = (value: string): string => {
  return value.replaceAll(',', '');
};

export const formatNumberString = (value: string): string => {
  const negative = value.startsWith('-');
  const raw = negative ? value.slice(1) : value;
  const [integerPart, decimalPart] = raw.split('.');
  const integerDigits = integerPart.replace(/^0+(?=\d)/, '') || '0';
  const grouped = new Intl.NumberFormat('en-US').format(Number(integerDigits));
  if (decimalPart !== undefined) {
    return `${negative ? '-' : ''}${grouped}.${decimalPart}`;
  }
  return `${negative ? '-' : ''}${grouped}`;
};

export const formatNumberForResult = (value: number): string => {
  const text = Number.isFinite(value)
    ? value.toFixed(7).replace(/\.?0+$/, '')
    : '0';
  return formatNumberString(text);
};

export const isOperator = (label: string): boolean => {
  return ['+', '−', '×', '÷', '%'].includes(label);
};

export const isNumber = (label: string): boolean => {
  return /\d/.test(label);
};

export const safeEval = (expression: string): number => {
  // Simple safe evaluation for basic operations
  try {
    // Use Function constructor for safer eval
    return new Function('return ' + expression)();
  } catch {
    return 0;
  }
};

export const normalizeInput = (input: string): string => {
  // Normalize operators
  return input.replaceAll('×', '*').replaceAll('÷', '/').replaceAll('−', '-');
};