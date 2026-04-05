import React, { useEffect, useRef } from 'react';
import Display from './Display';
import ButtonGrid from './ButtonGrid';
import buttonConfig from '../constants/buttonConfig';
import { useCalculator } from '../hooks/useCalculator';
import { isNumber, isOperator } from '../utils/calcUtils';
import './Calculator.css';

interface CalculatorProps {
  fontFamily: string;
}

const Calculator: React.FC<CalculatorProps> = ({ fontFamily }) => {
  const {
    displayValue,
    operationDisplay,
    inputDigit,
    inputOperator,
    performCalculation,
    clear,
    toggleSign,
    inputDecimal,
    backspace,
  } = useCalculator();

  const equalButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleButtonClick = (label: string) => {
    if (label === 'AC') {
      clear();
    } else if (label === '⌫') {
      backspace();
    } else if (label === '±') {
      toggleSign();
    } else if (label === '.') {
      inputDecimal();
    } else if (label === '=') {
      performCalculation();
      equalButtonRef.current?.focus();
    } else if (isNumber(label)) {
      inputDigit(label);
    } else if (isOperator(label)) {
      inputOperator(label);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (key >= '0' && key <= '9') {
        inputDigit(key);
      } else if (key === '+') {
        inputOperator('+');
      } else if (key === '-') {
        inputOperator('−');
      } else if (key === '*') {
        inputOperator('×');
      } else if (key === '/') {
        inputOperator('÷');
      } else if (key === 'Enter') {
        event.preventDefault();
        performCalculation();
        equalButtonRef.current?.focus();
      } else if (key === 'Escape') {
        clear();
      } else if (key === 'Backspace') {
        backspace();
      } else if (key === '.') {
        inputDecimal();
      } else if (key === '%') {
        inputOperator('%');
      }
    };

    globalThis.addEventListener('keydown', handleKeyDown);
    return () => {
      globalThis.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputDigit, inputOperator, performCalculation, clear, backspace, inputDecimal]);

  return (
    <div className="calculator">
      <Display value={displayValue} operation={operationDisplay} fontFamily={fontFamily} />
      <ButtonGrid buttons={buttonConfig} onButtonClick={handleButtonClick} equalButtonRef={equalButtonRef} />
    </div>
  );
};

export default Calculator;