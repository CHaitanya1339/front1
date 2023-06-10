import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';

const ViewGoals = () => {
  const [goals, setGoals] = useState([]);
  const updatedGoals=[];

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(()=>{
    axios.get("http://localhost:8080/goals")
      .then(res=>setGoals(res.data));
  },[])

  for(let i=0;i<goals.length;i++){
    if(goals[i]['user_id']===user['id']){
      updatedGoals.push(goals[i]);
    }
  }
  // console.log(updatedGoals);
  
  const handleRemoveGoal = async (goalId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/goal/${goalId}`
      );
      if (response.status===200) {
        const updatedGoals = goals.filter((goal) => goal.id !== goalId);
        setGoals(updatedGoals);
      } else {
        console.error('Failed to remove goal:', response.status);
      }
    } catch (error) {
      console.error('Error removing goal:', error);
    }
  };


  return (
    <>
    <div>
      <Navbar />
    </div>
    <div class="container">
      <h2>Fitness Goals List</h2>
      {goals.length === 0 ? (
        <p>No goals found.</p>
      ) : (
      <table class="table table-striped table-hover table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>S.No</th>
            <th scope="col">Goal Name</th>
            <th scope="col">Description</th>
            <th scope="col">Date to acheive</th>
            <th scope="col">Progress</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {updatedGoals.map((goal,index)=>(
            <tr>
              <th scope="row">{index+1}</th>
              <td>{goal.goalName}</td>
              <td>{goal.description}</td>
              <td>{goal.date}</td>
              <td>
              <input
                  type="range"
                  min={0}
                  max={100}
                  value={goal.progress}
              />{goal.progress}%
              </td>
              <td>
                <Link to={`/update-goal/${goal.id}`} class="btn btn-info" role="button">update</Link>
                <button onClick={() => handleRemoveGoal(goal.id)} class="btn btn-danger">remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div></>
  );
};


export default ViewGoals;
