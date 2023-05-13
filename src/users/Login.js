import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const Login = () => {
  
  let navigate = useNavigate();
  const [user, setUser] = useState({
    emailID: "",
    password: "",
  });

  const [dbData,setdbData]=useState([]);

  const fetchData = async()=>{
    const res=await axios.get("http://localhost:8081/users");
      console.log(res['data']);
      setdbData(res['data']);
  }
  

  useEffect(()=>{
      fetchData();
  },[]);

  const { emailID, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(user,dbData);
    for(let i=0;i<dbData.length;i++){
      console.log(dbData[i]['email'],user['emailID'],dbData[i]['password'],user['password']);
      if(dbData[i]['email']==user['emailID'] && dbData[i]['password']==user['password']){
        navigate('/Dashboard');
      }
    }
  };

  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Login</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Email ID" className="form-label">
                Email Address
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your Email Address"
                name="emailID"
                value={emailID}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type={"password"}
                className="form-control"
                placeholder="Enter your Password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Login
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
