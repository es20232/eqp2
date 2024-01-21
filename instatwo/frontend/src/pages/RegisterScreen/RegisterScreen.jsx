import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ContainerComponent from "../../components/ContainerComponent";
import InputFormComponent from "../../components/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent";
import NavBarComponent from "../../components/NavBarComponent";

export default function RegisterScreen() {
  return (
    <>
      <NavBarComponent></NavBarComponent>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center vh-100"
      >
        <Row>
          <Col>
            <ContainerComponent
              colorBackground="#e6e6e6"
              height="36rem"
              content={
                <>
                  <h1 style={{ color: "#0d263d" }}>Cadastre-se</h1>
                  <InputFormComponent
                    label="Nome"
                    placeholder="Digite seu nome..."
                  ></InputFormComponent>
                  <InputFormComponent
                    label="Nome de usuário"
                    placeholder='Digite seu nome de usuário...'
                  ></InputFormComponent>
                  <InputFormComponent
                    label="E-mail"
                    placeholder="Digite seu e-mail..."
                    type="email"
                  ></InputFormComponent>
                  <InputFormComponent
                    label="Senha"
                    placeholder="Digite sua senha..."
                    type="password"
                  ></InputFormComponent>
                  <InputFormComponent
                    label="Repetir senha"
                    placeholder="Digite sua senha novamente..."
                    type="password"
                  ></InputFormComponent>
                  <Row className="d-flex justify-content-center mt-4">
                    <ButtonComponent
                      sizeRound="10px"
                      isRound={true}
                      text="Cadastrar"
                      buttonColor="#267094"
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
