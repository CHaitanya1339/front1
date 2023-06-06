import React, { useState } from 'react';
import Navbar from '../layout/Navbar'
import '../style/Setting.css'

const Setting = () => {
  const [goal, setGoal] = useState('');
  const [date, setDate] = useState('');

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("New Goal Created.")
    // API call
    setGoal('');
    setDate('');
  };

  return (
    <>
    <div>
      <header>
        <Navbar />
      </header>
    </div>
    <div className="fitness-goal-container">
      <h2>Add Fitness Goal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="goal">Goal:</label>
          <input
            type="text"
            id="goal"
            value={goal}
            onChange={handleGoalChange}
            className="form-control"
            placeholder='Enter your goal..'
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Goal</button>
      </form>
    </div>
    </>
  );
};

export default Setting;
