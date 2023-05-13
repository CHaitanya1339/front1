import React from 'react';
import { Link } from 'react-router-dom';

function Userdash() {
  return (
    <div>
      <h1>Hello, [Name of the user]</h1>
      <nav>
        <ul>
          <li><Link to="/workout-history">Workout History</Link></li>
          <li><Link to="/exercise-tracking">Exercise Tracking</Link></li>
          <li><Link to="/goal-setting">Goal Setting</Link></li>
          <li><Link to="/workout-plan-creator">Workout Plan Creator</Link></li>
        </ul>
      </nav>
      <p>Graphs go here</p>
    </div>
  );
}

export default Userdash;
