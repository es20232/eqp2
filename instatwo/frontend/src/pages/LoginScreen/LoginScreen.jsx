import React from "react";
import ContainerComponent from "../../components/ContainerComponent";
import { Row, Col, Container, Button } from "react-bootstrap";
import InputFormComponent from "../../components/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent";

function LoginScreen() {
  const center_container = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1.3rem",
  };

  const content = {
    textAlign: "center",
  };

  function LogoLoginScreen() {
    return (
      <>
        <Container
          style={{ background: "gray", width: "180px", height: "220px" }}
        ></Container>
      </>
    );
  }

  function TextAppLogin(props) {
    return (
      <>
        <div style={center_container}>
          <div style={content}>
            <h1 style={{ color: props.colorLogoTitle, fontSize: "45px" }}>
              InstaTwo
            </h1>
            <p style={{ color: props.colorTextBelowTitle }}>
              Uma rede social para <br /> você e seus amigos.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Container fluid>
        <Row
          className="justify-content-center align-items-center"
          style={{ marginTop: "12%" }}
        >
          <Col xs="auto">
            <ContainerComponent
              colorBackground="#13293d"
              content={
                <Col className="justify-content-center align-items-center">
                  <LogoLoginScreen></LogoLoginScreen>
                  <TextAppLogin
                    colorLogoTitle="white"
                    colorTextBelowTitle="#6495b0"
                  ></TextAppLogin>
                </Col>
              }
            ></ContainerComponent>
          </Col>
          <Col xs="auto">
            <ContainerComponent
              colorBackground="#e6e6e6"
              content={
                <Col className="justify-content-center align-items-center">
                  <h1>Entrar</h1>
                  <InputFormComponent></InputFormComponent>
                  <InputFormComponent
                    type="password"
                    label="Senha"
                  ></InputFormComponent>
                  <div className="mt-4" style={center_container}>
                    <div style={content}>
                      <Button variant="link" style={{ color: "#267094" }}>
                        Esqueci a senha
                      </Button>
                    </div>
                  </div>
                  <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col xs="auto">
                      <ButtonComponent
                        buttonColor="#4d4d4d"
                        text="Cadastre-Se"
                      ></ButtonComponent>
                    </Col>
                    <Col xs="auto">
                      <ButtonComponent text="Entrar"></ButtonComponent>
                    </Col>
                  </Row>
                </Col>
              }
            ></ContainerComponent>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginScreen;
