import React, { useRef } from 'react'
import '../style/header.css'
import logo from '../assets/img/dumble.png'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const headerRef = useRef(null)
  const navigate = useNavigate()

  const headerFunc = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add('sticky_header')
    } else {
      headerRef.current.classList.remove('sticky_header')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', headerFunc)

    return () => window.removeEventListener('scroll', headerFunc)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    // redirect to login page or homepage
  }

  return (
    <header className='header' ref={headerRef}>
      <div className='container'>
        <div className='nav_wrapper'>
          {/* ==== LOGO ==== */}
          <div className='logo'>
            <div className='logo_img'>
              <img src={logo} alt='' />
            </div>
            <h2>FitBody</h2>
          </div>
          {/* ====== Navigation menu ======= */}
          {/* ======= nav right ======= */}
          <div className='nav_right'>
            <Link className='btn' to='/workout-history'>Workout History</Link>
            <span className='mobile_menu'>
              <i class='ri-menu-line'></i>
            </span>
          </div>
          <div className='nav_right'>
            <Link className='btn' to='/exercise-tracking'>Exercise Tracking</Link>
            <span className='mobile_menu'>
              <i class='ri-menu-line'></i>
            </span>
          </div>
          <div className='nav_right'>
            <Link className='btn' to='/goal-setting'>Goal Setting</Link>
            <span className='mobile_menu'>
              <i class='ri-menu-line'></i>
            </span>
          </div>
          <div className='nav_right'>
            <Link className='btn' to='/workout-plan-creator'>Workout Plan Creator</Link>
            <span className='mobile_menu'>
              <i class='ri-menu-line'></i>
            </span>
          </div>
          <div className='nav_right'>
            <Link className='btn' >Profile</Link>
            <button className='btn' onClick={handleLogout}>Logout</button>
            <span className='mobile_menu'>
              <i class='ri-menu-line'></i>
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
