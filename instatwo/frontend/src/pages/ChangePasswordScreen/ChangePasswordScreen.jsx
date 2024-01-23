import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ContainerComponent from "../../components/ContainerComponent";
import InputFormComponent from "../../components/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent";
import axios from "axios";
import { useState } from "react";

export default function RefreshScreen() {
  return (
    <>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center vh-100"
      >
        <Row>
          <Col>
            <ContainerComponent
              colorBackground="#e6e6e6"
              height="20rem"
              width="23rem"
              content={
                <>
                  <h1 style={{ color: "#6495b0" }}>Mude sua senha</h1>
                  
                  <InputFormComponent
                    label="Username"
                    placeholder="Digite seu username..."
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></InputFormComponent>
                  <InputFormComponent
                    label="Senha"
                    placeholder="Digite sua nova senha..."
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  ></InputFormComponent>
                  <Row className="d-flex justify-content-center mt-4">
                    <ButtonComponent
                      text="Enviar"
                      sizeRound="8px"
                      isRound={true}
                      buttonColor="#6495b0"
                      onClick={() => handleSendUsername()}
                    ></ButtonComponent>
                  </Row>
                </>
              }
            ></ContainerComponent>
          </Col>
        </Row>
      </Container>
    </>
  );
}
