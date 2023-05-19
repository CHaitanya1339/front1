import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import { Modal, Button, Form } from 'react-bootstrap';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showModal, setShowModal] = useState(false);
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


  const handleAddExercise = (workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    const exerciseName = event.target.elements.exerciseName.value;
    const exerciseSets = event.target.elements.exerciseSets.value;
    
    console.log('Exercise Name:', exerciseName);
    console.log('Number of Sets:', exerciseSets);

    setSelectedWorkout(null);
    setShowModal(false);
    event.target.reset();
  };
  
  const handleCloseModal = () => {
    setSelectedWorkout(null);
    setShowModal(false);
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
            <Form.Group controlId="exerciseName">
              <Form.Label>Exercise Name</Form.Label>
              <Form.Control type="text" name="exerciseName" required />
            </Form.Group>
            <Form.Group controlId="exerciseSets">
              <Form.Label>Number of Sets</Form.Label>
              <Form.Control type="number" name="exerciseSets" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Exercise
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WorkoutList;