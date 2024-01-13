import React from "react";
import {Row, Col, Button } from "react-bootstrap";
import ProfileImage from "../../components/ProfileImage";

function UserInformation() {
  return (
    <div
      style={{
        width: "60%",
        height: "200px",
        marginLeft: "20%",
        marginRight: "20%",
        padding: "20px",
      }}
      className="border-bottom"
    >
      <Row>
        <Col xs="auto" style={{ marginRight: "40px" }}>
          <ProfileImage
            imageURL="https://htmlcolorcodes.com/assets/images/colors/bright-blue-color-solid-background-1920x1080.png"
            altText="Profile Image"
            size="150px"
          />
        </Col>
        <Col xs="auto">
          <Row>
            <Col>
              <h5>Nome</h5>
              <h5>Nome do Usuário</h5>
              <p>Bio do User</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="secondary">Sair</Button>
            </Col>
            <Col>
              <Button variant="primary">Editar</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default UserInformation;
