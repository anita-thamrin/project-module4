import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Header from './Header';

function Planner({selectedPlace, formatStartDate, formatEndDate, handleListDays, listDays, numberOfDays,
                  handleChangeDesc, handleChangeCost, handleAddExpense, 
                  listItinerary, total, handleChangeDay, handleDelete, handleEditForm, handleUpdateForm,
                  handleSubmitForm, isEditing, setIsEditing, form, day, description, cost
}) {

  
  return (
    <>
      <Header />
      <h2>Destination: {selectedPlace}</h2>
      <div>
      <span style={{padding:"20px"}}>Start Date: {formatStartDate}</span>
      <span>End Date: {formatEndDate}</span>
      </div>
      {/* <Button variant="contained" style={{margin: "20px"}} onClick={handleListDays}>Add Itinerary</Button>
      <br /> */}
      {/* {listDays.map((item, id) =>  */}
        {/* ( */}
          <>
          {/* <p key={id}>Itinerary Day {item.number}</p>  */}
          <p>Itinerary for {numberOfDays} day(s)</p> 
          <label>
            Day: <input style={{marginRight: "10px"}} type="number" name="day" min="1" max={numberOfDays} value={day} onChange={handleChangeDay}/>
          </label>
          <label>
            Description: <input style={{marginRight: "10px"}}type="string" name="description" value={description} onChange={handleChangeDesc}/>
          </label>
          
          <label>
            Cost $: <input type="number" name="cost" value={cost} onChange={handleChangeCost}/>
          </label>
          <br />
          <Button style={{margin: "20px"}}variant="contained" onClick={handleAddExpense}>Add Expense</Button>
          </>
           {/* ))} */}
          <br/>
        
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Cost$</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {listItinerary.map((item) => (
                    <TableRow key={item.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell component="th" scope="row">{item.day}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.cost}</TableCell>
                        <TableCell onClick={()=>handleEditForm(item.id)}>✏️</TableCell>
                        
                        <TableCell onClick={()=>handleDelete(item.id)}>❌</TableCell>
                        
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
        <div style={{margin: "20px"}}>
            Total Expenses $: {total.toFixed(2)}
        </div>
        <div>
        <Link to='/'><Button variant="contained">Back</Button></Link>
        </div>
        {isEditing && 
          <form onSubmit={handleSubmitForm}>
            <table>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Description</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input value={form.day} type="number" onChange={(e) => handleUpdateForm(e, "day")} />
                  </td>
                  <td>
                    <input value={form.description} type="text" onChange={(e) => handleUpdateForm(e, "description")} />
                  </td>
                  <td>
                    <input value={form.cost} type="number" onChange={(e) => handleUpdateForm(e, "cost")} />
                  </td>
                </tr>
              </tbody>
            </table>
            <input type="submit" />
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        }
    </>
  );
}

export default Planner;