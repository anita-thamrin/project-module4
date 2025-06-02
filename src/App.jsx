import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';
import Places from "./components/Places";
import Planner from './components/Planner';
import dayjs from 'dayjs';
import countriesAPI from './api/countriesapi';

function App() {
  // const data = ["Kuala Lumpur, Malaysia", "Tokyo, Japan", "Osaka, Japan", "Penang, Malaysia", 
  //   "Hong Kong, Hong Kong"];

  const [selectedPlace, setSelectedPlace] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
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
  const [countries, setCountries] = useState();

  async function apiGet() {
    try {
      const response = await countriesAPI.get();
      console.log("GET status:", response.status);
      console.log("GET data:", response.data); 
      setCountries(response.data); 
    } catch(error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    apiGet();
  }, []);

  
  const handleChangePlace = (event, value) => {
    setSelectedPlace(value.name);
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

  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const numberOfDays = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
  
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
        const newExpense = {
            id: uuid(),
            day: day,
            description: description,
            cost: cost,
        }
        const newList = [...listItinerary, newExpense];
        setListItinerary(newList);
        
        const sum = total + Number(newExpense.cost);
        setTotal(sum);
  }

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
    const updatedForm = {...form, [key]: value};
    setForm(updatedForm);
  }

  const handleSubmitForm = (event) => {
    event.preventDefault();

    // Create new item and copy values from form
    const newItem = {...listItinerary[form.index]};
    newItem.day = form.day;
    newItem.description = form.description;
    newItem.cost = form.cost;

    // Copy current list and replace edited item
    const newList = [...listItinerary];
    newList[form.index] = newItem;
    setListItinerary(newList);

    // Remove the total sum and replace with the new total
    const newSum = total - Number(listItinerary[form.index].cost) + Number(newItem.cost);
    setTotal(newSum);
    setIsEditing(false);

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
                                            data={countries}
                                            
      />} />
      <Route path='planner' element={<Planner selectedPlace={selectedPlace}
                                              startDate={startDate}
                                              endDate={endDate}
                                              formatStartDate={formatStartDate}
                                              formatEndDate={formatEndDate}
                                              // handleListDays={handleListDays}
                                              listDays={listDays}
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
                                              
      />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
