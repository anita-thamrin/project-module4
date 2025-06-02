import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Header from './Header';

function Places({selectedPlace, handleChangePlace, startDate, handleStartDate,
                  endDate, handleEndDate, data
}) {
  
  return (
    <>
    <Header />
    <h1>Travel Expense Budget App</h1>
    <p>Select your destination:</p>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    
    <Autocomplete
      disablePortal
      options={data}
      getOptionLabel={(option)=>option.name}
      sx={{ width: 300 }}
      onChange={handleChangePlace}
      renderInput={(params) => <TextField {...params} label="Places" required={true} />}
    />
    
    </div>
    <div style={{display: 'inline-flex'}}>
    <span style={{padding: '20px'}}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDate}
          minDate={dayjs().add(1, 'day')}
          // minDate={startDate}
        />
      </DemoContainer>
    </LocalizationProvider>
    </span>
    <span style={{padding: '20px'}}> 
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDate}
          minDate={dayjs().add(1, 'day')}
          // minDate={startDate}
        />
      </DemoContainer>
    </LocalizationProvider>
    </span>
    </div>
    <br />
    {selectedPlace && 
    <Link to='/planner'><Button variant="contained">Plan your trip</Button></Link>
    }
    </>
  );
}

export default Places;


