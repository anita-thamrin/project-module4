import "react-datepicker/dist/react-datepicker.css";
import "./DateEntry.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";


  const getDatesInRange = (startDate, endDate) => {
	const dates = [];
	let currentDate = new Date(startDate);
	while (currentDate <= endDate) {
		dates.push(new Date(currentDate));
		currentDate.setDate(currentDate.getDate() + 1);
	}
	return dates;
};

function App() {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
 

  const [submittedDestination, setSubmittedDestination] = useState("");
  const [submittedStartDate, setSubmittedStartDate] = useState(null);
  const [submittedEndDate, setSubmittedEndDate] = useState(null);

  const [journalEntries, setJournalEntries] = useState([]);

  const handleJournalInputChange = (index, type, value) => {
	const updatedEntries = [...journalEntries];
	updatedEntries[index] = {
		...updatedEntries[index],
		[type]: value,
	};
	setJournalEntries(updatedEntries);
  };

  const handleChange = (range) => {
    const [startDate, endDate] = range;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleSubmit = () => {
	setSubmittedDestination(destination);
	setSubmittedStartDate(startDate);
	setSubmittedEndDate(endDate);

    if (startDate && endDate) {
      const dates = getDatesInRange(startDate, endDate);
      const initialJournalEntries = dates.map((date) => ({
        date: date,
        journal: "",
        openInput: "",
      }));
      setJournalEntries(initialJournalEntries);
    } else {
      setJournalEntries([]); // Clear table if dates are not selected
    }
  };

  return (
    <div>
		<h1>Start your journey</h1>
		<input placeholder="Key your destination here" 
		value={destination} 
		onChange={(e) => setDestination(e.target.value)}
		/>
      <DatePicker
        selectsStart
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        startDate={startDate}
		minDate={new Date()}
		isClearable
		placeholderText="Start Date"
      />
      <DatePicker
        selectsEnd
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        endDate={endDate}
        startDate={startDate}
        minDate={startDate || new Date()}
		isClearable
		placeholderText="End Date"
      />
	  <button onClick={handleSubmit}>Let's Go</button>
	  {submittedDestination || submittedStartDate || submittedEndDate ? (
        <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
          <h2>Your Journey Details:</h2>
          <p>
            <strong>Destination:</strong> {submittedDestination || "Not provided"}
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
            {submittedStartDate ? submittedStartDate.toLocaleDateString() : "Not selected"}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {submittedEndDate ? submittedEndDate.toLocaleDateString() : "Not selected"}
          </p>
        </div>
      ) : null}

 {journalEntries.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h2>Daily Journey Log:</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Date</th>
                <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Journal Entry</th>
                <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {journalEntries.map((entry, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    {entry.date.toLocaleDateString()}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <textarea
                      rows="3"
                      style={{ width: '98%', resize: 'vertical' }}
                      value={entry.journal}
                      onChange={(e) => handleJournalInputChange(index, "journal", e.target.value)}
                    />
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <input
                      type="text"
                      style={{ width: '98%' }}
                      value={entry.openInput}
                      onChange={(e) => handleJournalInputChange(index, "openInput", e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default App;