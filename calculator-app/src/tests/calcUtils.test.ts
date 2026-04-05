import { formatDisplayValue, isOperator, isNumber, normalizeInput } from '../utils/calcUtils';

describe('calcUtils', () => {
  describe('formatDisplayValue', () => {
    it('should format display value', () => {
      expect(formatDisplayValue('1.000')).toBe('1');
      expect(formatDisplayValue('1.500')).toBe('1.5');
      expect(formatDisplayValue('2')).toBe('2');
    });
  });

  describe('isOperator', () => {
    it('should identify operators', () => {
      expect(isOperator('+')).toBe(true);
      expect(isOperator('−')).toBe(true);
      expect(isOperator('×')).toBe(true);
      expect(isOperator('÷')).toBe(true);
      expect(isOperator('%')).toBe(true);
      expect(isOperator('1')).toBe(false);
    });
  });

  describe('isNumber', () => {
    it('should identify numbers', () => {
      expect(isNumber('1')).toBe(true);
      expect(isNumber('0')).toBe(true);
      expect(isNumber('+')).toBe(false);
    });
  });

  describe('normalizeInput', () => {
    it('should normalize operators', () => {
      expect(normalizeInput('1×2÷3−4')).toBe('1*2/3-4');
    });
  });
});