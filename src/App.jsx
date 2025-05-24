import { useState } from 'react';
import './App.css';
import Expense from "./components/Expense";

function App() {
  

  return (
    <>
    <div className="App">
      <h1>Expense Tracker App</h1>
      <Expense />
    </div>
    </>
  )
}

export default App;
