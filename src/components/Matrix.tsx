import React from 'react';
import { Table, TableBody, TableHead, TableCell, TableRow } from '@mui/material';
import { colorsForTruePositive, colorsForOther } from '../constants/colors.tsx'

interface MatrixProps {
  data: number[][];
  labels: string[][];
  size: [number, number];
}

const Matrix: React.FC<MatrixProps> = ({ data, labels, size }) => {

  const getBackgroundColor = (val: number, isDiagonal: boolean): string => {
    const colors = isDiagonal ? colorsForTruePositive : colorsForOther;
    for (let i = 0; i < colors.length; i++) {
      if (val <= colors[i].threshold) {
        return colors[i].color;
      }
    }
    return '';
  };

  const getTextColor = (val: number, isDiagonal: boolean): string => {
    const colors = isDiagonal ? colorsForTruePositive : colorsForOther;
    for (let i = 0; i < colors.length; i++) {
      if (val <= colors[i].threshold) {
        return colors[i].textColor;
      }
    }
    return '';
  };

  if (!data || !data.length) {
    return <p>Нет данных для отображения.</p>;
  }

  if (size[1] - size[0] <= 0) {
    return <p>Пожалуйста, выберите диапазон классов для отображения больше нуля.</p>;
  }

  const visibleData = data.slice(size[0], size[1]).map(row => row.slice(size[0], size[1]));

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ width: 60, border: 'none' }} />
          {labels[0].slice(size[0], size[1]).map((label, i) => <TableCell key={i} align='center' sx={{ width: 60, height: 60, border: 'none' }}>{label}</TableCell>)}
        </TableRow>
      </TableHead>
      <TableBody sx={{ border: 'none' }}>
        {visibleData.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            <TableCell align='center' sx={{ width: 60, height: 60, border: 'none' }}>{labels[1].slice(size[0], size[1])[rowIndex]}</TableCell>
            {row.map((val, cellIndex) => (
              <TableCell
                align='center'
                key={cellIndex}
                sx={{
                  width: 60,
                  height: 60,
                  background: getBackgroundColor(val, rowIndex === cellIndex),
                  color: getTextColor(val, rowIndex === cellIndex),
                  border: '1px solid #E0E6EE',
                  fontSize: '10px'
                }}
              >
                {val}%
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Matrix;
