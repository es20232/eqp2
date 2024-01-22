import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ContainerComponent from "../../components/ContainerComponent";
import InputFormComponent from "../../components/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent";

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
                  <h1 style={{ color: "#6495b0" }}>Recuperar Senha</h1>
                  <p>Iremos mandar um e-mail com um link para recuperar sua senha.</p>
                  <InputFormComponent
                    label="E-mail"
                    placeholder="Digite seu e-mail..."
                    type="email"
                  ></InputFormComponent>
                  <Row className="d-flex justify-content-center mt-4">
                  <ButtonComponent text="Enviar" buttonColor="#6495b0"></ButtonComponent>
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