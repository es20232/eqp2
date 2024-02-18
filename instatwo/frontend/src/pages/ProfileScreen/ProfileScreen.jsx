import React from "react";
import NavBarComponent from "../../components/NavBarComponent";
import { Container } from "react-bootstrap";
import UserInformation from "./UserInformation";
import { Image, Row, Col } from "react-bootstrap";
import icro from "../../images/icro.jpg";

function ProfileScreen() {
  return (
    <div>
      <NavBarComponent></NavBarComponent>
      <Container className="mt-5 ml-5 d-flex align-items-center">
        <div style={{ marginTop: "24rem" }}></div>
        <UserInformation></UserInformation>
      </Container>
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <Image src={icro} height={400} width={400} rounded />
          </Col>
          <Col xs={6} md={4}>
            <Image src={icro} height={400} width={400} rounded />
          </Col>
          <Col xs={6} md={4}>
            <Image src={icro} height={400} width={400} rounded />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileScreen;
