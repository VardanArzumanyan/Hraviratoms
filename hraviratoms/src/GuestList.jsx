import React, { useEffect, useState } from 'react';
import './GuestList.css'; // Create this CSS file for styling if needed

function GuestList() {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    // Adjust the URL to point to the public directory
    fetch('/data/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setGuests(data);
      })
      .catch(error => {
        console.error('Error fetching guest data:', error);
      });
  }, []);

  return (
    <div className="guest-list">
      <h1>Guest List</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Guest Count</th>
          </tr>
        </thead>
        <tbody>
          {guests.length > 0 ? (
            guests.map((guest, index) => (
              <tr key={index}>
                <td>{guest.firstName}</td>
                <td>{guest.lastName}</td>
                <td>{guest.guestCount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No guests found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GuestList;
