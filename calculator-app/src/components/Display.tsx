import React from 'react';

interface DisplayProps {
  value: string;
  operation?: string;
  fontFamily?: string;
}

const Display: React.FC<DisplayProps> = ({ value, operation, fontFamily }) => {
  return (
    <div className="display" style={fontFamily ? { fontFamily } : undefined}>
      {operation && <div className="operation" data-testid="operation-display">{operation}</div>}
      <div className="value" data-testid="display-value">{value}</div>
    </div>
  );
};

export default Display;