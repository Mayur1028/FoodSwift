import './App.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'  //npm i bootstrap-dark-5 boostrap
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from './screen/Home.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import Navbar from './components/Navbar';
import Login from './screen/Login.js';
import Signup from './screen/Signup.js';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screen/Myorder.js';
import ContactUs from './screen/ContactUs.js';
import AboutUs from './screen/AboutUs.js';


function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/myorder" element={<MyOrder />} />
            <Route exact path="/contactus" element={<ContactUs />} />
            <Route exact path="/aboutus" element={<AboutUs />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;