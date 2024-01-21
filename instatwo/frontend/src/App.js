import React from "react";
import "./index.css";
import DashBoardScreen from "./pages/DashBoardScreen/DashBoardScreen";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import ProfileScreen from "./pages/ProfileScreen/ProfileScreen";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DashBoardScreen/>} />
          <Route path="/auth/login" element={<LoginScreen/>} />
          <Route path="/profile" element={<ProfileScreen/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
