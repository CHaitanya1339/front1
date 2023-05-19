import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import axios from 'axios';
import './History.css';

const History = () => {
  const [workoutData, setWorkoutData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseSets, setExerciseSets] = useState('');
  const [setError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const id = user.id;
    axios
      .get(`http://localhost:8081/users/${id}/workouts`)
      .then((res) => {
        setWorkoutData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filtered = workoutData.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getFullYear() === selectedDate.getFullYear() &&
        itemDate.getMonth() === selectedDate.getMonth() &&
        itemDate.getDate() === selectedDate.getDate()
      );
    });
    setFilteredData(filtered);
  }, [selectedDate, workoutData]);

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  const handleDeleteWorkout = (id) => {
    axios
      .delete(`http://localhost:8081/workouts/${id}`)
      .then((res) => {
        const updatedWorkoutData = workoutData.filter((item) => item.id !== id);
        setWorkoutData(updatedWorkoutData);
      })
      .catch((err) => console.log(err));
  };

  const handleAddExercise = (workoutId) => {
    setSelectedWorkoutId(workoutId);
    setShowExerciseForm(true);
  };

  const handleExerciseFormClose = () => {
    setShowExerciseForm(false);
    setExerciseName('');
    setExerciseSets('');
    setError('');
  };

  const handleExerciseFormSubmit = (e) => {
    e.preventDefault();
    if (!exerciseName || !exerciseSets) {
      setError('Please enter exercise name and sets.');
      return;
    }
    const exercise = {
      name: exerciseName,
      sets: exerciseSets,
    };
    const updatedWorkoutData = workoutData.map((item) => {
      if (item.id === selectedWorkoutId) {
        return {
          ...item,
          exercises: [...(item.exercises || []), exercise],
        };
      }
      return item;
    });
    setWorkoutData(updatedWorkoutData);
    setSelectedWorkoutId(null);
    setShowExerciseForm(false);
    setExerciseName('');
    setExerciseSets('');
    setError('');
  };

  return (
    <div>
      <header>
        <Navbar />
      </header>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Filter by date</h5>
                <div className="form-group">
                  <label htmlFor="date">Select a date:</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="form-control"
                    value={selectedDate.toISOString().slice(0, 10)}
                    onChange={handleDateChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Workout history</h5>
                <div className="row">
                  {filteredData.map((item) => {
                    const { id, date, duration, notes } = item;
                    const exercises = item.exercises || [];

                    return (
                      <div key={id} className="col-md-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">{date}</h6>
                            <p className="card-text">Duration: {duration} minutes</p>
                            <p className="card-text">Notes: {notes}</p>

                            <div className="exercises">
                              <h6 className="card-subtitle mb-2">Exercises:</h6>
                              {exercises.map((exercise, index) => (
                                <p key={index} className="card-text">
                                  {exercise.name} - Sets: {exercise.sets}
                                </p>
                              ))}
                            </div>

                            <button
                              className="btn btn-sm btn-danger mr-2"
                              onClick={() => handleDeleteWorkout(item.id)}
                            >
                              Delete Workout
                            </button>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleAddExercise(item.id)}
                            >
                              Add Exercise
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showExerciseForm && (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 shadow">
              <h2 className="text-center mb-4">Add Exercise</h2>
              <form onSubmit={handleExerciseFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="exerciseName" className="form-label">
                    Exercise Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exerciseName"
                    name="exerciseName"
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exerciseSets" className="form-label">
                    Sets
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exerciseSets"
                    name="exerciseSets"
                    value={exerciseSets}
                    onChange={(e) => setExerciseSets(e.target.value)}
                    required
                  />
                </div>
                <button className="btn btn-secondary ml-2" onClick={handleExerciseFormClose}>
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
