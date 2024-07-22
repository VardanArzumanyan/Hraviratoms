import React, { useState, useEffect } from 'react';
import './GuestList.css';

const GuestList = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    fetch('/guests')
      .then(response => response.json())
      .then(data => setGuests(data))
      .catch(error => console.error('Error fetching guest data:', error));
  }, []);

  return (
    <div className="guest-list">
      <h2>Guest List</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Guest Count</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest, index) => (
            <tr key={index}>
              <td>{guest.firstName}</td>
              <td>{guest.lastName}</td>
              <td>{guest.guestCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestList;
