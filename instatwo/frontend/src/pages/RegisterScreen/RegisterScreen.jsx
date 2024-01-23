import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ContainerComponent from "../../components/ContainerComponent";
import InputFormComponent from "../../components/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent";
import NavBarComponent from "../../components/NavBarComponent";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [registerError, setRegisterError] = useState(null);
  const [passwordMismatchError, setPasswordMismatchError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleRegister = async () => {
    // Verifica se as senhas são diferentes
    if (password !== repeatPassword) {
      setPasswordMismatchError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        name: name,
        username: username,
        email: email,
        password: password,
        // repeatPassword: repeatPassword,
      });

      // Limpa os campos do formulário após o registro bem-sucedido.
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      setPasswordMismatchError("");

      // Exibe uma mensagem ou realiza alguma ação após o registro bem-sucedido.
      alert("Registro bem-sucedido!");
      setRedirect(true);
    } catch (error) {
      // Exibe mensagem de erro usando 'setRegisterError'.
      setRegisterError(
        error.response ? error.response.data.message : "Erro ao registrar!"
      );
    }
  };

  if (redirect) {
    return <Navigate to="/auth/login" />;
  }

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
              height="38rem"
              content={
                <>
                  <h1 style={{ color: "#0d263d", fontWeight: "bold" }}>
                    Cadastre-se
                  </h1>
                  <InputFormComponent
                    label="Nome"
                    placeholder="Digite seu nome..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></InputFormComponent>
                  <InputFormComponent
                    label="Nome de usuário"
                    placeholder="Digite seu nome de usuário..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></InputFormComponent>
                  <InputFormComponent
                    label="E-mail"
                    placeholder="Digite seu e-mail..."
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></InputFormComponent>
                  <InputFormComponent
                    label="Senha"
                    placeholder="Digite sua senha..."
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></InputFormComponent>
                  <InputFormComponent
                    label="Repetir senha"
                    placeholder="Digite sua senha novamente..."
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => {
                      setRepeatPassword(e.target.value);
                      setPasswordMismatchError("");
                    }}
                  ></InputFormComponent>
                  {passwordMismatchError && (
                    <p style={{ color: "red" }}>{passwordMismatchError}</p>
                  )}
                  {registerError && (
                    <p style={{ color: "red" }}>{registerError}</p>
                  )}
                  <Row className="d-flex justify-content-center mt-4">
                    <Col className="d-flex justify-content-center align-items-center">
                      <ButtonComponent
                        sizeRound="8px"
                        isRound={true}
                        text="Cadastrar"
                        buttonColor="#267094"
                        onClick={() => handleRegister()}
                      ></ButtonComponent>
                    </Col>
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
