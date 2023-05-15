import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const WorkoutForm = () => {

  let navigate = useNavigate()

  const [workout, setUser] = useState({
    date: "",
    duration: "",
    notes: "",
  });

  const { date, duration, notes } = workout

  const user = JSON.parse(localStorage.getItem('user'));

  const onInputChange = (e) => {
    setUser({ ...workout, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    alert("User is Succesfully Registered")
    e.preventDefault();
    await axios.post(`http://localhost:8081/workout/${user.id}`, workout)
    
  }
  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Add Workout</h2>
            <form onSubmit={(e) => onSubmit(e)}>

              <div className="mb-3">
                <label htmlFor="user_id" className="form-label">
                  UserId
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder={user.id}
                  name="user_id"
                  value={user.id}
                  disabled
                />
              </div>


              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type={"date"}
                  className="form-control"
                  placeholder="DD/MM/YYYY"
                  name="date"
                  value={date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="duration" className="form-label">
                  Duration
                </label>
                <input
                  type={"number"}
                  className="form-control"
                  placeholder="Enter the duration (in Sec)"
                  name="duration"
                  value={duration}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="notes" className="form-label">
                  Notes
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter a Note"
                  name="notes"
                  value={notes}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/user-dashboard">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkoutForm