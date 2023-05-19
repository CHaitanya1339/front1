import React, { useEffect } from 'react';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Tracking = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="container">
        <div className="card" data-aos="fade-up">
          <div className="card-body">
            <h5 className="card-title">Add Your Exercises</h5>
            <p className="card-text">Start adding your exercises to track your progress.</p>
            <Link to="/add-exercises" className="btn btn-primary">Add Exercises</Link>
          </div>
        </div>
        <div className="card" data-aos="fade-up">
          <div className="card-body">
            <h5 className="card-title">Show Your Exercises</h5>
            <p className="card-text">View your tracked exercises and analyze your progress.</p>
            <Link to="/show-exercises" className="btn btn-primary">Show Exercises</Link>
          </div>
        </div>
        <div className="card" data-aos="fade-up">
          <div className="card-body">
            <h5 className="card-title">Update Your Exercises</h5>
            <p className="card-text">Update your tracked exercises and keep your records up to date.</p>
            <Link to="/update-exercises" className="btn btn-primary">Update Exercises</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
