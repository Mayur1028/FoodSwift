import React, { useState } from 'react'
import Navbar from '../components/Navbar';
export default function ContactUs() {
    //here we used usestate which consist of credentials which is a state of each component (variable) and setCredebtials
    //that is a function which updates the value of the state and rerenders the react component and in the bracket we have 
    //the initial vaues of the state 
    const [credentials, setCredentials] = useState({ name: "", email: "",message:""});


    //this is the code for handling submit after the submit button is clicked
    //In this we are sending the date of state variable to the backend api which will thw give a respnse
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/usermsg", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, message: credentials.message})
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            alert("Your Message Is Sent Successfully")
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
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
            <div>
                <Navbar />
            </div>
            <div class="container px-5 my-5 ">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="card border-0 rounded-3 shadow-lg">
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <div class="h1 fw-light">Contact Form</div>
                                    <p class="mb-4 text-muted"></p>
                                </div>

                                <form id="contactForm bg-dark border-success rounded">

                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="name" type="text" placeholder="name" name='name'  value={credentials.name} data-sb-validations="required" onChange={onChange} />
                                        <label for="name">Name</label>
                                        <div class="invalid-feedback" data-sb-feedback="name:required">Name is required.</div>
                                    </div>


                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="emailAddress" type="email" placeholder="Email Address" name='email' value={credentials.email} data-sb-validations="required,email"  onChange={onChange} aria-describedby="emailHelp" />
                                        <label for="emailAddress">Email Address</label>
                                        <div class="invalid-feedback" data-sb-feedback="emailAddress:required">Email Address is required.</div>
                                        <div class="invalid-feedback" data-sb-feedback="emailAddress:email">Email Address Email is not valid.</div>
                                    </div>

                                    <div class="form-floating mb-3">
                                        <textarea class="form-control" id="message" type="text" placeholder="Message" style={{height:"10rem"}} name='message' value={credentials.message} data-sb-validations="required" onChange={onChange}></textarea>
                                        <label for="message">Message</label>
                                        <div class="invalid-feedback" data-sb-feedback="message:required">Message is required.</div>
                                    </div>


                                    <div class="d-none" id="submitErrorMessage">
                                        <div class="text-center text-danger mb-3">Error sending message!</div>
                                    </div>


                                    <div class="d-grid">
                                        <button class="btn btn-primary btn-lg " id="submitButton" type="submit " onClick={handleSubmit} >Submit</button>
                                    </div>
                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            )
}
