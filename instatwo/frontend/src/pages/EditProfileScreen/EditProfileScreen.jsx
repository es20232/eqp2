import React from "react";
import NavBarComponent from "../../components/NavBarComponet";
import { Container, Row, Col } from "react-bootstrap";
import ProfileImage from "../../components/ProfileImage";
import { FaEdit } from "react-icons/fa";

const CircularIcon = () => {
    return (
      <div
        style={{
          marginTop: "-70px",
          height: "80px", 
          width: "80px", 
          borderRadius: "50%", 
          backgroundColor: "#999999",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FaEdit size={26} color="white" />
      </div>
    );
  };

export default function EditProfileScreen() {
  return (
    <div>
      <NavBarComponent></NavBarComponent>
      <Container className="d-flex justify-content-center align-items-center">
        <Row>
          <Col>
            <div style={{ marginTop: "8rem" }}>
              <ProfileImage
                imageURL="https://htmlcolorcodes.com/assets/images/colors/bright-blue-color-solid-background-1920x1080.png"
                altText="Profile Image"
                size="250px"
              />
              <div className="d-flex justify-content-end">
                <CircularIcon></CircularIcon>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
