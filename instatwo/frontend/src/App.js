
import React from "react";
import "./index.css";
import DashBoardScreen from "./pages/DashBoardScreen/DashBoardScreen";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import ProfileScreen from "./pages/ProfileScreen/ProfileScreen";
import EditProfileScreen from "./pages/EditProfileScreen/EditProfileScreen";
import RegisterScreen from "./pages/RegisterScreen/RegisterScreen";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RefreshScreen from "./pages/RefreshScreen/RefreshScreen";
import ChangePasswordScreen from "./pages/ChangePasswordScreen/ChangePasswordScreen";
import CommentsScreen from "./pages/CommentsScreen/CommentsScreen";
import UsersProfiles from "./pages/UsersProfiles/UsersProfiles";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen/>} />
          <Route path="/auth/login" element={<LoginScreen/>} />
          <Route path="/auth/register" element={<RegisterScreen/>} />
          <Route path="/profile" element={<ProfileScreen/>} />
          <Route path="/profile/edit" element={<EditProfileScreen/>} />
          <Route path="/dashboard" element={<DashBoardScreen/>} />
          <Route path="/refresh" element={<RefreshScreen/>} />
          <Route path="/change_password" element={<ChangePasswordScreen/>} />
          <Route path="/comments/:post_id" element={<CommentsScreen/>} />
          <Route path="/usersprofiles/:username" element={<UsersProfiles/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
