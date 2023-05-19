import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.id;

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/users/${userId}/workouts`);
        setWorkouts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkouts();
  }, [userId]);

  const navigate = useNavigate();

  const handleAddExercise = (workoutId) => {
    navigate(`/add-exercise/${workoutId}`);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Workout List</h2>
          <table className='table'>
            <thead>
              <tr>
                <th>Workout ID</th>
                <th>Notes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id}>
                  <td>{workout.id}</td>
                  <td>{workout.notes}</td>
                  <td>
                    <button
                      className='btn btn-primary'
                      onClick={() => handleAddExercise(workout.id)}
                    >
                      Add Exercise
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WorkoutList;
