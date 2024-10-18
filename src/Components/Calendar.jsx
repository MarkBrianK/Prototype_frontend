import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    console.log("Selected date:", newDate);
  };

  return (
    <div>
      <h3>Select a Date</h3>
      <Calendar
        onChange={handleDateChange}
        value={date}
      />
    </div>
  );
};

export default MyCalendar;
