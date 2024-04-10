import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SliderComponent from './components/SliderComponent';
import Matrix from './components/Matrix';
import data3class from './mockData/3class.json';
import data15class from './mockData/15class.json';
import { marks } from './constants/slider'
import './App.css';

const App = () => {
  const [sliderValue, setSliderValue] = useState([0, 10]);
  const [open, setOpen] = useState(false);
  const [matrixData, setMatrixData] = useState(data15class);

  //min 10x10 max 10x10
  const handlerSliderChange = (event, value) => {
    const min = value[0];
    const max = value[1];

    const minChanged = sliderValue[0] !== min;

    if (min > matrixData?.data.length - 10) {
      setSliderValue([matrixData?.data.length - 10, matrixData?.data.length])
      return;
    }

    if (max > matrixData?.data.length) {
      setSliderValue([matrixData?.data.length - 10, matrixData?.data.length])
      return;
    }

    if (max < 10) {
      setSliderValue([0, 10])
      return;
    }

    if (min > 20) {
      setSliderValue([20, 30])
      return;
    }

    if (max - min < 10) {
      minChanged ? setSliderValue([min, max + 1]) : setSliderValue([min - 1, max]);
      return;
    }

    if (max - min > 10) {
      minChanged ? setSliderValue([min, min - 1]) : setSliderValue([min + 1, max]);
      return;
    }

    setSliderValue([min, max]);
  }

  const hadleButtonClick = (data) => {
    const min = Math.min(data.data.length, 10);
    setMatrixData(data);
    setOpen(true);
    setSliderValue([0, min])
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: 5 }}>
        <Button variant='outlined' sx={{ marginRight: '20px' }} onClick={() => { hadleButtonClick(data15class); }}>Открыть матрицу 15</Button>
        <Button variant='outlined' onClick={() => { hadleButtonClick(data3class); }}>Открыть матрицу 3</Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth='md' fullWidth={true} fullScreen={false} >
        <DialogTitle sx={{ background: '#F4F7FB', borderBottom: '1px solid #ECF1F8' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p className='titleModal'>Матрица ошибок</p>
            <IconButton edge='end' size='small' onClick={() => setOpen(false)} aria-label='close' sx={{ color: '#BABEC9', background: '#FFFFFF' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <p className='descriptionModal'>Выберите диапазон классов для просмотра </p>
          <Box sx={{ maxWidth: '600px', marginLeft: '140px' }}>
            <SliderComponent onChange={handlerSliderChange}
              value={sliderValue}
              marks={marks} />
          </Box>
        </DialogTitle>

        <DialogContent display='flex' alignItems='center'>
          <Box display='flex' alignItems='center' justifyContent='space-around'>
            <Box display='flex' alignItems='center'>
              <p className='verticalAxis'>Прогноз <span className='salePrice'>SalePrice</span></p>
              <Box>
                <Box sx={{ marginRight: 3 }}>
                  <Matrix
                    data={matrixData.data}
                    labels={matrixData.labels}
                    size={sliderValue}
                  />
                </Box>
                <p className='horizontalAxis'>Факт <span className='salePrice'>SalePrice</span></p>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;