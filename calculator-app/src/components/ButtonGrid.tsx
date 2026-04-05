import React from 'react';
import CalculatorButton from './CalculatorButton';

interface ButtonConfig {
  label: string;
  type?: string;
}

interface ButtonGridProps {
  buttons: ButtonConfig[];
  onButtonClick: (label: string) => void;
  equalButtonRef?: React.Ref<HTMLButtonElement>;
}

const ButtonGrid: React.FC<ButtonGridProps> = ({ buttons, onButtonClick, equalButtonRef }) => {
  return (
    <div className="button-grid">
      {buttons.map((button) => (
        <CalculatorButton
          key={button.label}
          label={button.label}
          onClick={() => onButtonClick(button.label)}
          className={button.type}
          ref={button.label === '=' ? equalButtonRef : undefined}
        />
      ))}
    </div>
  );
};

export default ButtonGrid;