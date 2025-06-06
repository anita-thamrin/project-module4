import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';
import Places from "./components/Places";
import Planner from './components/Planner';
import dayjs from 'dayjs';
import AboutUs from './components/About';
import ContactUs from './components/Contact';
import FrequentlyAsked from './components/Questions';
import TermsConditions from './components/Terms';
import Footer from './components/Footer';
import currencyAPI from './api/currency';


function App() {

  const [selectedPlace, setSelectedPlace] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formatStartDate, setFormatStartDate] = useState('');
  const [formatEndDate, setFormatEndDate] = useState('');
  const [listDays, setListDays] = useState();
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState(0);
  const [listItinerary, setListItinerary] = useState([]);
  const [total, setTotal] = useState(0);
  const [day, setDay] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  
  const blankForm = {
    index: 0,
    day:'',
    description: "",
    cost: 0,
  }
  const [form, setForm] = useState(blankForm);
  const [exchangeRates, setExchangeRates] = useState(null);

  const numberOfDays = (startDate && endDate) ?
  Math.max(0, Math.floor((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)) + 1)
  : 0;


   // Reset just the input fields
  const handleResetInputs = () => {
    setDay(1);
    setDescription('');
    setCost(0);
  };

  // Reset the entire itinerary
  const handleResetAll = () => {
    setListItinerary([]);
    setTotal(0);
    handleResetInputs(); // Also reset the inputs
    setIsEditing(false);
  };

  // Complete reset function
  const handleCompleteReset = useCallback(() => {
    setSelectedPlace('');
    setStartDate(null);
    setEndDate(null);
    setFormatStartDate('');
    setFormatEndDate('');
    setListDays(null);

    // Resets Planner.jsx data
    setListItinerary([]);
    setTotal(0);
    setDay(1);
    setDescription('');
    setCost(0);
    setIsEditing(false);
    setForm(blankForm);
    setExchangeRates(null);
  }, []);

  async function apiGetCurrencyRates() {
    try {
      const rates = await currencyAPI.getLatestRates('USD', 'EUR,GBP,SGD');
      setExchangeRates(rates);
    } catch (error) {
      console.log("Error fetching currency rates:", error.message);
    }
  }

  useEffect(() => {
    apiGetCurrencyRates();
  }, []);

  
  const handleChangePlace = (event, value) => {
    setSelectedPlace(value ? value.country_name : '');
  };

  const handleStartDate = (date) => {
    setStartDate(date);
    let formattedStartDate = dayjs(date.$d).format('DD-MM-YYYY');
    setFormatStartDate(formattedStartDate);
  }

  const handleEndDate = (date) => {
    setEndDate(date);
    let formattedEndDate = dayjs(date.$d).format('DD-MM-YYYY');
    setFormatEndDate(formattedEndDate);
  }

  //const date1 = new Date(startDate);
  //const date2 = new Date(endDate);
  //const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  //const numberOfDays = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
  
  // const handleListDays = (numberOfDays) => {
  //   let dict = [];
  //   for(let i=1; i<=numberOfDays; i++){
  //     dict.push({
  //       id: uuid(),
  //       number: i
  //     });
  //   }
  //   setListDays(dict); 
  // }

  
  const handleChangeDesc = (e) => {
    const valDesc = e.target.value;
    setDescription(valDesc);
  }

  const handleChangeCost = (e) => {
    const valCost = e.target.value;
    setCost(valCost);
  }

  const handleChangeDay = (e) => {
    const valDay = e.target.value;
    setDay(valDay);
  }

  const handleAddExpense = () => {
    const parsedCost = Number(cost);
    const parsedDay = Number(day);

    if (parsedCost < 0) {
      alert('Cost cannot be negative');
      return;
    }

    if (parsedDay < 1 || parsedDay > numberOfDays || isNaN(parsedDay)) {
      alert(`Day must be a number between 1 and ${numberOfDays}.`);
      return;
    }

        const newExpense = {
            id: uuid(),
            day: parsedDay,
            description: description,
            cost: parsedCost,
        }
        const newList = [...listItinerary, newExpense];
        setListItinerary(newList);
        
        const sum = total + parsedExpense.cost;
        setTotal(sum);
        handleResetInputs();
  };


  const handleDelete = (id) => {
        const newList = listItinerary.filter((item) =>item.id !== id);
        setListItinerary(newList);
        const newTotal = newList.reduce((acc, currVal) => acc + Number(currVal.cost), 0);
        setTotal(newTotal);
  }

  const handleEditForm = (id) => {
    const i = listItinerary.findIndex((item) => item.id === id);
    const editValues = {
      index: i,
      day: listItinerary[i].day,
      description: listItinerary[i].description,
      cost: listItinerary[i].cost,
    }
    setForm(editValues);
    setIsEditing(true);
  }

  const handleUpdateForm = (e, key) => {
    const value = e.target.value;
    if (key === 'day') {
      const parsedValue = Number(value);
      if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > numberOfDays) {
        console.warn('Date is out of range.')
      }
    } else if (key === 'cost') {
  const parsedValue = Number(value);
    if (isNaN(parsedValue) || parsedValue < 0)  {
      console.ware('Negative or invalid Cost')
    }
    }
    const updatedForm = {...form, [key]: value};
    setForm(updatedForm);
  }

  const handleSubmitForm = (event) => {
    event.preventDefault();

    const parsedDay = Number(form.day);
    const parsefCost = Number(form.cost);

    if (isNaN(parsedDay) || parsedDay < 1 || parsedDay > numberOfDays) {
      alert(`Updated day must be a number between 1 and ${numberOfDays}.`);
      return;
    }

    if (isNaN(parsefCost) || parsefCost < 0) {
      AlternateEmail('Updated Cost cannot be negative or invalid.');
      return;
    }

    if (!form.description.trim()) {
      alert('Description cannot be empty.');
      return;
    }

  
    // Create new item and copy values from form
    const newItem = {...listItinerary[form.index]};
    newItem.day = parsedDay;
    newItem.description = form.description;
    newItem.cost = parsedCost;

    // Copy current list and replace edited item
    const newList = [...listItinerary];
    newList[form.index] = newItem;
    setListItinerary(newList);

    // Remove the total sum and replace with the new total
    const oldCost = Number(listItinerary[form.index]. cost);
    const newSum = total - oldCost + newItem.cost;
    setTotal(newSum);
    setIsEditing(false);
    setForm(blankForm);
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Places 
                                            selectedPlace={selectedPlace}
                                            handleChangePlace={handleChangePlace}
                                            startDate={startDate}
                                            handleStartDate={handleStartDate}
                                            endDate={endDate}
                                            handleEndDate={handleEndDate}
                                            exchangeRates={exchangeRates}
                                            
      />} />
      <Route path='planner' element={<Planner selectedPlace={selectedPlace}
                                              startDate={startDate}
                                              endDate={endDate}
                                              formatStartDate={formatStartDate}
                                              formatEndDate={formatEndDate}
                                              // handleListDays={handleListDays}
                                              // listDays={listDays}
                                              numberOfDays={numberOfDays}
                                              description={description}
                                              cost={cost}
                                              handleChangeDesc={handleChangeDesc}
                                              handleChangeCost={handleChangeCost}
                                              handleAddExpense={handleAddExpense}
                                              total={total}
                                              listItinerary={listItinerary}
                                              handleChangeDay={handleChangeDay}
                                              handleDelete={handleDelete}
                                              handleEditForm={handleEditForm}
                                              handleUpdateForm={handleUpdateForm}
                                              handleSubmitForm={handleSubmitForm}
                                              isEditing={isEditing}
                                              setIsEditing={setIsEditing}
                                              form={form}
                                              day={day}
                                              handleResetInputs={handleResetInputs}  
                                              handleResetAll={handleResetAll}
                                              handleCompleteReset={handleCompleteReset} 
                                              exchangeRates={exchangeRates}     
                                              
      />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/questions' element={<FrequentlyAsked />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/terms' element={<TermsConditions />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
