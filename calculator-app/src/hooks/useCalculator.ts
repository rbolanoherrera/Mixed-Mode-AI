import { useRef, useState } from 'react';
import {
  formatNumberForResult,
  formatNumberString,
  stripGroupingSeparators,
} from '../utils/calcUtils';

export const useCalculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operationDisplay, setOperationDisplay] = useState('');
  const [hasResult, setHasResult] = useState(false);

  const displayValueRef = useRef('0');
  const previousValueRef = useRef<number | null>(null);
  const operatorRef = useRef<string | null>(null);
  const waitingForOperandRef = useRef(false);
  const operationDisplayRef = useRef('');
  const hasResultRef = useRef(false);

  const setDisplayValueWithRef = (value: string) => {
    displayValueRef.current = value;
    setDisplayValue(value);
  };

  const setPreviousValueWithRef = (value: number | null) => {
    previousValueRef.current = value;
    setPreviousValue(value);
  };

  const setOperatorWithRef = (value: string | null) => {
    operatorRef.current = value;
    setOperator(value);
  };

  const setWaitingForOperandWithRef = (value: boolean) => {
    waitingForOperandRef.current = value;
    setWaitingForOperand(value);
  };

  const setOperationDisplayWithRef = (value: string) => {
    operationDisplayRef.current = value;
    setOperationDisplay(value);
  };

  const setHasResultWithRef = (value: boolean) => {
    hasResultRef.current = value;
    setHasResult(value);
  };

  const MAX_INPUT_LENGTH = 12;

  const getRawValue = (value: string) => {
    return stripGroupingSeparators(value);
  };

  const hasReachedMaxLength = (rawValue: string) => {
    return rawValue.replace('-', '').length >= MAX_INPUT_LENGTH;
  };

  const updateOperationDisplay = (currentDisplay?: string) => {
    if (waitingForOperandRef.current && previousValueRef.current !== null && operatorRef.current) {
      const displayToUse = currentDisplay ?? displayValueRef.current;
      setOperationDisplayWithRef(
        `${formatNumberString(previousValueRef.current.toString())} ${operatorRef.current} ${formatNumberString(getRawValue(displayToUse))}`
      );
    }
  };

  const inputDigit = (digit: string) => {
    if (hasResultRef.current) {
      setOperationDisplayWithRef('');
      setHasResultWithRef(false);
    }

    const rawValue = getRawValue(displayValueRef.current);
    const shouldReplace = waitingForOperandRef.current || rawValue === '0';

    if (!shouldReplace && hasReachedMaxLength(rawValue)) {
      return;
    }

    const newDisplay = shouldReplace ? digit : rawValue + digit;

    if (newDisplay.replace('-', '').length > MAX_INPUT_LENGTH) {
      return;
    }

    setDisplayValueWithRef(formatNumberString(newDisplay));
    setWaitingForOperandWithRef(false);
    updateOperationDisplay(newDisplay);
  };

  const inputOperator = (nextOperator: string) => {
    const inputValue = Number.parseFloat(getRawValue(displayValueRef.current));
    let nextPrevious = previousValueRef.current;

    if (hasResultRef.current) {
      nextPrevious = inputValue;
      setPreviousValueWithRef(inputValue);
      setHasResultWithRef(false);
    } else if (previousValueRef.current === null) {
      nextPrevious = inputValue;
      setPreviousValueWithRef(inputValue);
    } else if (operatorRef.current) {
      const currentValue = previousValueRef.current || 0;
      const newValue = calculate(currentValue, inputValue, operatorRef.current);
      nextPrevious = newValue;
      setDisplayValueWithRef(formatNumberForResult(newValue));
      setPreviousValueWithRef(newValue);
    }

    setWaitingForOperandWithRef(true);
    setOperatorWithRef(nextOperator);
    setOperationDisplayWithRef(
      `${formatNumberString((nextPrevious ?? inputValue).toString())} ${nextOperator} `
    );
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '−':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '%':
        return firstValue % secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = Number.parseFloat(getRawValue(displayValueRef.current));

    if (operationDisplayRef.current) {
      if (previousValueRef.current !== null && operatorRef.current) {
        const newValue = calculate(previousValueRef.current, inputValue, operatorRef.current);
        setDisplayValueWithRef(formatNumberForResult(newValue));
        setOperationDisplayWithRef(
          `${formatNumberString(previousValueRef.current.toString())} ${operatorRef.current} ${formatNumberString(inputValue.toString())} =`
        );
        setPreviousValueWithRef(null);
        setOperatorWithRef(null);
        setWaitingForOperandWithRef(true);
        setHasResultWithRef(true);
      }
    }
    // If operationDisplay is empty, do nothing
  };

  const clear = () => {
    setDisplayValueWithRef('0');
    setPreviousValueWithRef(null);
    setOperatorWithRef(null);
    setWaitingForOperandWithRef(false);
    setOperationDisplayWithRef('');
    setHasResultWithRef(false);
  };

  const toggleSign = () => {
    const currentValue = displayValueRef.current;
    const rawValue = getRawValue(currentValue);
    const newValue = currentValue.startsWith('-') ? rawValue : `-${rawValue}`;
    setDisplayValueWithRef(newValue);
    updateOperationDisplay(newValue);
  };

  const inputDecimal = () => {
    const rawValue = getRawValue(displayValueRef.current);

    if (waitingForOperandRef.current) {
      if (MAX_INPUT_LENGTH < 2) {
        return;
      }
      const newDisplay = '0.';
      setDisplayValueWithRef(newDisplay);
      setWaitingForOperandWithRef(false);
      updateOperationDisplay(newDisplay);
      return;
    }

    if (!rawValue.includes('.') && rawValue.replace('-', '').length < MAX_INPUT_LENGTH) {
      const newValue = `${rawValue}.`;
      setDisplayValueWithRef(formatNumberString(newValue));
      updateOperationDisplay(newValue);
    }
  };

  const backspace = () => {
    const currentValue = displayValueRef.current;
    const rawValue = getRawValue(currentValue);

    if (rawValue.length > 1) {
      const updatedValue = rawValue.slice(0, -1);
      setDisplayValueWithRef(formatNumberString(updatedValue));
      updateOperationDisplay(updatedValue);
    } else {
      setDisplayValueWithRef('0');
      updateOperationDisplay('0');
    }
  };

  return {
    displayValue,
    operationDisplay,
    inputDigit,
    inputOperator,
    performCalculation,
    clear,
    toggleSign,
    inputDecimal,
    backspace,
  };
};