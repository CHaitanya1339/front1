import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../layout/Navbar';

const AddExerciseForm = ({ workoutId, workoutNotes }) => {
  const [exercises, setExercises] = useState([]);
  const [exercise, setExercise] = useState({
    workout_id: workoutId,
    id: '',
    name: '',
    description: '',
  });

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/exercises`);
        setExercises(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExercises();
  }, []);

  const onInputChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8081/workouts/${workoutId}/exercises`,
        exercise
      );
      console.log(response); // Handle the response as needed
      setExercise({
        workout_id: workoutId,
        id: '',
        name: '',
        description: '',
      });
      alert('Exercise Added Successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Add Exercise to Workout</h2>
          <div className='mb-3'>
            <label htmlFor='workoutId' className='form-label'>
              Workout ID
            </label>
            <input
              type='number'
              className='form-control'
              id='workoutId'
              name='workoutId'
              value={workoutId}
              readOnly={true}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='workoutNotes' className='form-label'>
              Workout Notes
            </label>
            <textarea
              className='form-control'
              id='workoutNotes'
              name='workoutNotes'
              value={workoutNotes}
              readOnly={true}
            ></textarea>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='exerciseId' className='form-label'>
                Exercise
              </label>
              <select
                className='form-control'
                id='exerciseId'
                name='exerciseId'
                value={exercise.id}
                onChange={onInputChange}
              >
                <option value=''>Select Exercise</option>
                {exercises.map((exercise) => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Name
              </label>
              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={exercise.name}
                onChange={onInputChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='description' className='form-label'>
                Description
              </label>
              <textarea
                className='form-control'
                id='description'
                name='description'
                value={exercise.description}
                onChange={onInputChange}
              ></textarea>
            </div>
            <button type='submit' className='btn btn-primary'>
              Add Exercise
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddExerciseForm;
