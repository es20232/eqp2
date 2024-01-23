
import React from "react";
import "./index.css";
import DashBoardScreen from "./pages/DashBoardScreen/DashBoardScreen";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import ProfileScreen from "./pages/ProfileScreen/ProfileScreen";
import EditProfileScreen from "./pages/EditProfileScreen/EditProfileScreen";
import RegisterScreen from "./pages/RegisterScreen/RegisterScreen";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RefreshScreen from "./pages/RefreshScreen/RefreshScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DashBoardScreen/>} />
          <Route path="/auth/login" element={<LoginScreen/>} />
          <Route path="/auth/register" element={<RegisterScreen/>} />
          <Route path="/profile" element={<ProfileScreen/>} />
          <Route path="/profile/edit" element={<EditProfileScreen/>} />
          <Route path="/refresh" element={<RefreshScreen/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
