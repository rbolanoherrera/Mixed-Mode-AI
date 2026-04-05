import { renderHook, act } from '@testing-library/react';
import { useCalculator } from '../hooks/useCalculator';

describe('useCalculator', () => {
  it('should initialize with display value 0', () => {
    const { result } = renderHook(() => useCalculator());
    expect(result.current.displayValue).toBe('0');
  });

  it('should input digits correctly', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.inputDigit('1');
    });
    expect(result.current.displayValue).toBe('1');

    act(() => {
      result.current.inputDigit('2');
    });
    expect(result.current.displayValue).toBe('12');
  });

  it('should clear the display', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.inputDigit('1');
      result.current.clear();
    });
    expect(result.current.displayValue).toBe('0');
  });

  it('should toggle sign', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.inputDigit('5');
      result.current.toggleSign();
    });
    expect(result.current.displayValue).toBe('-5');
  });

  it('should input decimal', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.inputDigit('1');
      result.current.inputDecimal();
      result.current.inputDigit('2');
    });
    expect(result.current.displayValue).toBe('1.2');
  });

  it('should not exceed 12 digits including decimal', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      const digits = '123456789012';
      digits.split('').forEach((digit) => result.current.inputDigit(digit));
      result.current.inputDigit('3');
    });

    expect(result.current.displayValue).toBe('123,456,789,012');

    act(() => {
      result.current.clear();
      result.current.inputDigit('1');
      result.current.inputDecimal();
      for (let i = 0; i < 10; i += 1) {
        result.current.inputDigit('1');
      }
      result.current.inputDigit('2');
    });

    expect(result.current.displayValue).toBe('1.1111111111');
  });

  it('should perform addition', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.inputDigit('1');
      result.current.inputOperator('+');
      result.current.inputDigit('2');
      result.current.performCalculation();
    });
    expect(result.current.displayValue).toBe('3');
  });

  it('should backspace', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.inputDigit('1');
      result.current.inputDigit('2');
      result.current.backspace();
    });
    expect(result.current.displayValue).toBe('1');
  });
});