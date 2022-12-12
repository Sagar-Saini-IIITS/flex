import React from 'react'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const {name,email,password,cpassword}=credentials;
    if(password!==cpassword){
      props.showAlert(" Password not Matching.","danger",5000);
    }
    else{
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,email,password})
    });
    const json = await response.json();
    if(json.success){
      navigate("/login");
      console.log(json);
      props.showAlert("Account created Successfully. Please Login","success");
    }
    else{
      props.showAlert("Invalid Credentials","danger");
    }
  }
  }
  
  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }

  return (
    <div className='container'>
       <h2 className='mheading my-4'>Signup</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="text" className="form-control" id="password" name="password" minLength={5} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>

    </div>
  )
}

export default Signup;