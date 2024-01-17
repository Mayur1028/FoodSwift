import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom'
export default function Login() {

    //here we used usestate which consist of credentials which is a state of each component (variable) and setCredebtials
    //that is a function which updates the value of the state and rerenders the react component and in the bracket we have 
    //the initial vaues of the state 
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()


    //this is the code for handling submit after the submit button is clicked
    //In this we are sending the date of state variable to the backend api which will thw give a respnse
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/loginuser", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    const json = await response.json()
    console.log(json);
    if (json.success) {

      //Stores the user's email in the browser's local storage. Local storage 
      //is a way to store data in the user's browser, and it persists even if the user closes or refreshes the page.
      localStorage.setItem("userEmail",credentials.email);

      //Stores an authentication token (presumably received from the server) in the local storage.
      localStorage.setItem("authToken",json.authToken);

      //Logs the authentication token to the console
      console.log(localStorage.getItem("authToken"))

      //if done responce from the login api is successfull the navigates to home page
      navigate("/");
    }
    else {
      alert("Enter Valid Credentials")
    }
  }

  //this is the function that we used in useState to update the value of state variable
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' placeholder='Ex- mayur1001@gmail.com'  value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" placeholder='**********' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" value={credentials.password} onChange={onChange} name='password' />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/signup" className="m-3 mx-1 btn btn-danger">New User</Link>
        </form>

      </div>
    </div>
  )
}

