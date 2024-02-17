import React from "react";
import ContainerComponent from "../../components/ContainerComponent";
import { Row, Col, Container, Button, Alert } from "react-bootstrap";
import InputFormComponent from "../../components/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent";
import img01 from "../../images/img01.png";
import img02 from "../../images/img02.png";
import NavBarComponent from "../../components/NavBarComponent";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email: email,
        password: password,
      });

      // Verifica se 'response.data' está definido antes de acessá-lo.
      const jwtToken = response && response.data ? response.data.jwt : null;

      // Armazena o token JWT no estado ou no armazenamento local (localStorage ou sessionStorage).
      setLoginError(null);

      // Configura o estado para redirecionar.
      setRedirect(true);
    } catch (error) {
      // Verifica se 'error.response' e 'error.response.data' estão definidos antes de acessá-los.
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Erro desconhecido";

      // Exibe mensagem de erro usando 'setLoginError'.
      setLoginError(errorMessage);
    }
  };

  if (redirect) {
    return <Navigate to="/dashboard" />;
  }

  const center_container = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1.3rem",
  };

  const content = {
    textAlign: "center",
  };

  function LogoLoginScreen(props) {
    return (
      <>
        <Container style={{ width: "240px", height: "220px" }}>
          <img src={props.img01} />
        </Container>
      </>
    );
  }

  function TextAppLogin(props) {
    return (
      <>
        <div style={center_container}>
          <div style={content}>
            <h1 style={{ color: props.colorLogoTitle, fontSize: "45px" }}>
              <img
                src={props.img02}
                style={{ width: "180px", height: "40px" }}
              />
            </h1>
            <p style={{ color: props.colorTextBelowTitle, fontWeight: "bold" }}>
              Uma rede social para <br /> você e seus amigos.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBarComponent></NavBarComponent>
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
                  <LogoLoginScreen img01={img01}></LogoLoginScreen>
                  <TextAppLogin
                    img02={img02}
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
                  <h1 style={{ color: "#0d263d", fontWeight: "Bold" }}>
                    Entrar
                  </h1>
                  <InputFormComponent
                    type="text"
                    label="E-mail"
                    placeholder="Digite seu email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></InputFormComponent>
                  <InputFormComponent
                    type="password"
                    label="Senha"
                    placeholder="Digite sua senha..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></InputFormComponent>
                  <div className="mt-4" style={center_container}>
                    <div style={content}>
                      <Button
                        href="/refresh"
                        variant="link"
                        style={{ color: "#267094" }}
                      >
                        Esqueci a senha
                      </Button>
                    </div>
                  </div>
                  <Row className="d-flex justify-content-center align-items-center mt-3">
                    <Col xs="auto">
                      <ButtonComponent
                        to="/auth/register"
                        buttonColor="#4d4d4d"
                        textColor="white"
                        text="Cadastre-se"
                        sizeRound="8px"
                        isRound={true}
                      ></ButtonComponent>
                    </Col>
                    <Col xs="auto">
                      <ButtonComponent
                        text="Entrar"
                        sizeRound="8px"
                        isRound={true}
                        onClick={handleLogin}
                      ></ButtonComponent>
                    </Col>
                  </Row>
                  {loginError && (
                    <Alert variant="danger" className="mt-3">
                      {loginError}
                    </Alert>
                  )}
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
