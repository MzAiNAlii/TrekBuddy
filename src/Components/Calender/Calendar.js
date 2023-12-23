import React from 'react';
import './Calendar.scss'; 

const Calendar = () => {
  return (
    <div className='calendar'>

      <div className="month">
          <div>
            DECEMBER <br/>
            <span style={{ fontSize: '3vw' , fontWeight: '700'}}>2021</span>
          </div>
          <div className='arrow'>
          <div className="prev">&#10094;</div>
          <div className="next">&#10095;</div>
          </div>
      </div>

    <div >
      <ul className="days">
        {[...Array(31).keys()].map((day) => (
          <li key={day + 1}>{day + 1}</li>
        ))}
      </ul>
      </div>
      
    </div>
  );
};

export default Calendar;
