/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import axios from 'axios';
import './History.css';
import { Modal, Button, Form } from 'react-bootstrap';

const History = () => {
  const [workoutData, setWorkoutData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedWorkout, setUpdatedWorkout] = useState({
    id: '',
    date: '',
    duration: '',
    notes: ''
  });
  

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const id = user.id;
        const response = await axios.get(
          `http://localhost:8081/users/${id}/workouts`
        );
        setWorkoutData(response.data);
        setLoading(false); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchWorkoutData();
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

  const handleUpdateWorkout = (workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);
    setUpdatedWorkout({
      id: workout.id,
      date: workout.date,
      duration: workout.duration,
      notes: workout.notes
    });
  };

  const handleDeleteWorkout = (workoutId) => {
    axios
      .delete(`http://localhost:8081/workouts/${workoutId}`)
      .then((res) => {
        const updatedWorkoutData = filteredData.filter((item) => item.id !== workoutId);
        setFilteredData(updatedWorkoutData);
        console.log(`Workout with ID ${workoutId} deleted successfully. Status: ${res.status}`);
        alert('Workout deleted successfully');
      })
      .catch((err) => {
        console.log(err);
        alert('An error occurred while deleting the workout');
      });
  };
  
  const handleUpdate = async (event) => {
    event.preventDefault();
  
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user && user.id;
  
      const updatedWorkoutWithUserId = {
        ...updatedWorkout,
        userId: userId
      };
  
      const response = await axios.put(
        `http://localhost:8081/workouts/${updatedWorkout.id}`,
        { ...updatedWorkout, userId }
      );
  
      const updatedWorkoutData = workoutData.map((item) =>
        item.id === updatedWorkout.id ? response.data : item
      );
  
      setWorkoutData(updatedWorkoutData);
  
      const updatedFilteredData = filteredData.map((item) =>
        item.id === updatedWorkout.id ? response.data : item
      );
  
      setFilteredData(updatedFilteredData);
  
      alert('Workout Updated Successfully');
      console.log("sent successfully");
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };
  
  

  // const handleUpdate = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await axios.put(
  //       `http://localhost:8081/workouts/${updatedWorkout.id}`,
  //       updatedWorkout
  //     );
  //     const updatedWorkoutData = workoutData.map((item) =>
  //       item.id === updatedWorkout.id ? response.data : item
  //     );
  //     setWorkoutData(updatedWorkoutData);
  //     const updatedFilteredData = filteredData.map((item) =>
  //     item.id === updatedWorkout.id ? response.data : item
  //   );
  //   setFilteredData(updatedFilteredData);
  //     alert('Workout Updated Successfully');
  //     handleCloseModal();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const workoutNames = [
    'Cardiovascular Workouts',
    'Strength Training',
    'Flexibility and Mobility',
    'Group Fitness',
    'Outdoor Activities',
    'Mind-Body Exercises'
  ];
  

  const handleCloseModal = () => {
    setSelectedWorkout(null);
    setShowModal(false);
    setUpdatedWorkout({
      id: '',
      date: '',
      duration: '',
      notes: ''
    });
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
                    /*const exercises = item.exercises || [];*/

                    return (
                      <div key={id} className="col-md-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">{date}</h6>
                            <p className="card-text">Duration: {duration} minutes</p>
                            <p className="card-text">Notes: {notes}</p>
                            <br />

                            {/* <div className="exercises">
                              <h6 className="card-subtitle mb-2">Exercises:</h6>
                              {exercises.map((exercise, index) => (
                                <p key={index} className="card-text">
                                  {exercise.name} - Sets: {exercise.sets}
                                </p>
                              ))}
                            </div> */}

                            <button
                              className="btn btn-sm btn-danger mr-2"
                              onClick={() => handleDeleteWorkout(id)}
                              style={{ marginRight: '10px' }}
                            >
                              Delete Workout
                            </button>

                            <button
                              className="btn btn-sm btn-danger mr-2"
                              onClick={() => handleUpdateWorkout(item)}
                              style={{ backgroundColor: '#0096FF', marginLeft: '10px' }}
                            >
                              Update Workout
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

      <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Update Your Workout {selectedWorkout && selectedWorkout.notes}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleUpdate}>
      <Form.Group controlId="updateDate">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={updatedWorkout.date}
          onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, date: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group controlId="updateDuration">
        <Form.Label>Duration</Form.Label>
        <Form.Control
          type="number"
          value={updatedWorkout.duration}
          onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, duration: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group controlId="updateWorkoutName">
        <Form.Label>Select a Workout</Form.Label>
        <Form.Control
          as="select"
          value={updatedWorkout.notes}
          onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, notes: e.target.value })}
        >
          <option value="">Choose a Workout</option>
          {workoutNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  </Modal.Body>
</Modal>

    </div>
  );
};

export default History;
