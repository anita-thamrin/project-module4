import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Header from './Header';
import Footer from './Footer';

function Places({selectedPlace, handleChangePlace, startDate, handleStartDate,
                  endDate, handleEndDate, handleCompleteReset
}) {

  const navigate = useNavigate();

  const [citiesCountriesData, setCitiesCountriesData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [errorLoadingData, setErrorLoadingData] = useState(false);

  const GITHUB_RAW_DATA_URL = 'https://raw.githubusercontent.com/tessalla/tessalla.github.io/main/Data/cities_countries.json';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GITHUB_RAW_DATA_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCitiesCountriesData(data);
        setLoadingData(false);
      } catch (error) {
        console.error("Failed to load cities, countries data:", error);
        setErrorLoadingData(true);
        setLoadingData(false);
      }
    };
  
  fetchData();
}, []);

if (loadingData) {
  return (
    <>
        <Header />
            <h1>Travel Expense & Itinerary Planner</h1>
        <p style={{ color: 'green' }}>Loading destinations....</p>
        <Footer />
    </>
  );
}


if (errorLoadingData) {
  return (
    <>
        <Header />
            <h1>Travel Expense & Itinerary Planner</h1>
        <p style={{ color: 'red' }}>Error loading destinations. Please try again</p>
        <Footer />
    </>
  );
}

  return (
    <>
    <Header />
    <h1>Travel Expense & Itinerary Planner</h1>
    <p>Select your destination:</p>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    
    <Autocomplete
      disablePortal
      options={citiesCountriesData}
      getOptionLabel={(option)=>option.country_name}
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
    {selectedPlace && startDate && endDate &&
    <Link to='/planner'><Button variant="contained">Plan your trip</Button></Link>
    }
    <Footer />
    </>
  );
}

export default Places;


