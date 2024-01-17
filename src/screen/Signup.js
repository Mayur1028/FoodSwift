import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
export default function Signup() {

    //here we used usestate which consist of credentials which is a state of each component (variable) and setCredebtials
    //that is a function which updates the value of the state and rerenders the react component and in the bracket we have 
    //the initial vaues of the state 
    const [credentials, setCredentials] = useState({ name: "", email: "",address:"", password: ""});


    //this is the code for handling submit after the submit button is clicked
    //In this we are sending the date of state variable to the backend api which will thw give a respnse
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/createuser", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, address: credentials.address, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            alert("Registration Successful")
        }
        else{
            alert("Enter Valid Credentials")
        }
 
    }

    //this is the function that we used in useState to update the value of state variable
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
            <div>
                <Navbar />
            </div>

            <div className='container' >
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder='Ex- Mayur Kalbande' name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="m-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" placeholder='Ex- mayur1001@gmail.com' name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="m-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" placeholder='Ex- Bhumkar Chowk, Pune, Maharashtra' name='address'  value={credentials.address} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder='**********' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" value={credentials.password} onChange={onChange} name='password' />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
                </form>
            </div>
        </div>
    )
}