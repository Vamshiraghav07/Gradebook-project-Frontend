// src/Table.js

import React, { useState } from 'react';
import students from './Student';
import './Table.css'; // Import CSS file for table styling

function Table() {
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc'); // State to hold sorting order
  const [selectedStudent, setSelectedStudent] = useState(null); // State to hold the selected student
  const [selectedRow, setSelectedRow] = useState(null); // State to hold the selected row index

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleRowClick = (student, index) => {
    setSelectedStudent(student);
    setSelectedRow(index);
  };

  const handleCommentsClick = (student) => {
    setSelectedStudent(student); // Set the selected student when Comments button is clicked
  };

  return (
    <div>
      <label>
        Filter by:
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="pass">Pass</option>
          <option value="fail">Fail</option>
        </select>
      </label>
      <label>
        Sort by:
        <select onChange={handleSortChange}>
          <option value="alphabetic">Alphabetic Order</option>
          <option value="finalGrade">Final Grade</option>
        </select>
      </label>
      <table className="styled-table"> {/* Add className for table styling */}
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>Ticket's Number</th>
            <th>Rating Grade</th>
            <th>Exam Grade</th>
            <th>Final Grade</th>
            <th>Status</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => ( // Iterate over original students array
            <tr 
              key={student.id} 
              className={selectedRow === index ? 'selected-row' : ''} // Apply selected-row class if this row is selected
              onClick={() => handleRowClick(student, index)} // Call handleRowClick function on row click
            >
              <td>{index + 1}</td>
              <td>{selectedRow === index ? student.name.toUpperCase() : student.name}</td> {/* Apply uppercase if this row is selected */}
              <td>{student.ticketNumber}</td>
              <td>{student.ratingGrade}</td>
              <td>{student.examGrade}</td>
              <td>{(0.6 * student.examGrade + 0.4 * student.ratingGrade).toFixed(2)}</td>
              <td>{(0.6 * student.examGrade + 0.4 * student.ratingGrade) >= 4 ? "Passed" : "Failed"}</td>
              <td><button onClick={() => handleCommentsClick(student)}>Comments</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStudent && (
        <div>
          <h2>Selected Student Comments:</h2>
          <p>{selectedStudent.comments}</p>
        </div>
      )}
    </div>
  );
}

export default Table;
