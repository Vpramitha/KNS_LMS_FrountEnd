import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import Home from './Home'; // Assuming Home.jsx is the component you want to connect
import Login from './Login';
import Signup from './Signup';
import DashBoard from './DashBoard';
import Catalog from './Catalog';

import User from './User';
import Employee from './Employee';

function App() {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="" element={<Home />} /> {/* Use element prop instead of component */}
        <Route path="/Login" element={<Login/>} /> {/* Use element prop instead of component */}
        <Route path="/Signup" element={<Signup/>} /> {/* Use element prop instead of component */}
        <Route path="/DashBoard" element={<DashBoard/>}/>
        <Route path="/Catalog" element={<Catalog/>}/>
        <Route path="/User" element={<User/>}/>
        <Route path="/Employee" element={<Employee/>}/>
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;


