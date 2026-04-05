import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from '../components/Calculator';

describe('Calculator', () => {
  it('should render the calculator', () => {
    render(<Calculator />);
    expect(screen.getByTestId('display-value')).toHaveTextContent('0');
  });

  it('should display button labels', () => {
    render(<Calculator />);
    expect(screen.getByRole('button', { name: 'AC' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '=' })).toBeInTheDocument();
  });

  it('should handle button clicks', () => {
    render(<Calculator />);
    const button1 = screen.getByRole('button', { name: '1' });
    fireEvent.click(button1);
    expect(screen.getByTestId('display-value')).toHaveTextContent('1');
  });

  it('should perform calculation on = click', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));
    expect(screen.getByTestId('display-value')).toHaveTextContent('3');
  });
});