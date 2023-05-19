import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import { Modal, Button, Form } from 'react-bootstrap';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseSets, setExerciseSets] = useState('');
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

  const handleAddExercise = (workout) => {
    setSelectedWorkout(workout);
    setExerciseName('');
    setExerciseSets('');
    setShowModal(true);
  };


  const handleExerciseNameChange = (event) => {
    setExerciseName(event.target.value);
=======
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post(
        `http://localhost:8081/workouts/${selectedWorkout.id}/exercises`,
        {
          name: exerciseName,
          sets: exerciseSets,
        }
      );

      console.log('Exercise added:', response.data);

      setSelectedWorkout(null);
      setShowModal(false);
      event.target.reset();
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
>>>>>>> 4044e44c44d924a0a3f8dc9c5cc40f5ac6d55b07
  };

  const handleExerciseDescriptionChange = (event) => {
    setExerciseDescription(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    alert("Exercise Added!")

    const exercise = {
      workoutId: selectedWorkout.id,
      name: exerciseName,
      description: exerciseDescription
    };

    try {
      await axios.post(`http://localhost:8081/workouts/${selectedWorkout.id}/exercises`, exercise);
      setSelectedWorkout(null);
      setShowModal(false);
      setExerciseName('');
      setExerciseDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setSelectedWorkout(null);
    setShowModal(false);
    setExerciseName('');
    setExerciseDescription('');
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
                      onClick={() => handleAddExercise(workout)}
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Exercise to {selectedWorkout && selectedWorkout.notes}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId='exerciseName'>
              <Form.Label>Exercise Name</Form.Label>
              <Form.Control as='select' value={exerciseName} onChange={handleExerciseNameChange} required>
                <option value=''>Select Exercise</option>
                {selectedWorkout && (
                  <>
                    {selectedWorkout.notes === 'Outdoor Activities' && (
                      <>
                        <option value='Hiking'>Hiking</option>
                        <option value='Swimming'>Swimming</option>
                        <option value='Rock Climbing'>Rock Climbing</option>
                        <option value='Kayaking/Canoeing'>Kayaking/Canoeing</option>
                        <option value='Stand-up Paddleboarding (SUP)'>Stand-up Paddleboarding (SUP)</option>
                        <option value='Tennis'>Tennis</option>
                        <option value='Soccer'>Soccer</option>
                      </>
                    )}
                    {selectedWorkout.notes === 'Cardiovascular Workouts' && (
                      <>
                        <option value='Running/Jogging on a Treadmill or Outdoors'>Running/Jogging on a Treadmill or Outdoors</option>
                        <option value='Cycling (Indoor or Outdoor)'>Cycling (Indoor or Outdoor)</option>
                        <option value='Jumping Rope'>Jumping Rope</option>
                        <option value='High-Intensity Interval Training (HIIT)'>High-Intensity Interval Training (HIIT)</option>
                        <option value='Stair Climbing'>Stair Climbing</option>
                        <option value='Rowing'>Rowing</option>
                      </>
                    )}
                    {/* Add other workout categories here */}
                  </>
                )}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='exerciseDescription'>
              <Form.Label>Exercise Description</Form.Label>
              <Form.Control as='textarea' rows={3} value={exerciseDescription} onChange={handleExerciseDescriptionChange} required />
=======
              <Form.Control
                type="text"
                name="exerciseName"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="exerciseSets">
              <Form.Label>Number of Sets</Form.Label>
              <Form.Control
                type="number"
                name="exerciseSets"
                value={exerciseSets}
                onChange={(e) => setExerciseSets(e.target.value)}
                required
              />
>>>>>>> 4044e44c44d924a0a3f8dc9c5cc40f5ac6d55b07
            </Form.Group>
            <Button variant='primary' type='submit'>
              Add Exercise
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WorkoutList;
