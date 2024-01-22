import React from "react";
import NavBarComponent from "../../components/NavBarComponent";
import { Container } from "react-bootstrap";
import UserInformation from "./UserInformation";

function ProfileScreen() {
  return (
    <div>
      <NavBarComponent></NavBarComponent>
      <Container className="mt-5 ml-5 d-flex align-items-center">
        <div style={{ marginTop: "18rem" }}></div>
        <UserInformation></UserInformation>
      </Container>
    </div>
  );
}

export default ProfileScreen;
