// src/Table.js

import './Table.css';
import React, { useState } from 'react';
import students from './Student';

function Table() {
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc'); // State to hold sorting order
  const [selectedStudent, setSelectedStudent] = useState(null); // State to hold the selected student

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCommentsClick = (student) => {
    setSelectedStudent(student); // Set the selected student when Comments button is clicked
  };

  // Sorting function for alphabetic order
  const sortByAlphabeticOrder = () => {
    students.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  };

  // Sorting function for final grade
  const sortByFinalGrade = () => {
    students.sort((a, b) => {
      const finalGradeA = 0.6 * a.examGrade + 0.4 * a.ratingGrade;
      const finalGradeB = 0.6 * b.examGrade + 0.4 * b.ratingGrade;
      if (sortOrder === 'asc') {
        return finalGradeA - finalGradeB;
      } else {
        return finalGradeB - finalGradeA;
      }
    });
  };

  // Handle sorting by alphabetic order or final grade
  const handleSortChange = (event) => {
    const value = event.target.value;
    if (value === 'alphabetic') {
      sortByAlphabeticOrder();
    } else if (value === 'finalGrade') {
      sortByFinalGrade();
    }
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc'); // Toggle sorting order
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
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
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
