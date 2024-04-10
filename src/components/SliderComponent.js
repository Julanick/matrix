import React from 'react';
import { Slider } from '@mui/material';

const SliderComponent = ({ marks, value, onChange }) => {
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
