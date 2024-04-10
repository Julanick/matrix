import React from 'react';
import { Slider } from '@mui/material';

interface SliderProps {
  marks: { value: number; label: string; }[];
  value: [number, number];
  onChange: (event: any, value: number | number[]) => void;
}

const SliderComponent: React.FC<SliderProps> = ({ marks, value, onChange }) => {
  return (
    <Slider
      onChange={onChange}
      valueLabelDisplay='auto'
      disableSwap
      value={value}
      defaultValue={[0, 10]}
      step={1}
      min={0}
      max={30}
      marks={marks}
    />
  );
}

export default SliderComponent;
