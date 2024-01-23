import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ContainerComponent from "../../components/ContainerComponent";
import InputFormComponent from "../../components/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ChangePasswordScreen() {
  const [username, setUsername] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [tokenstr, setTokenstr] = React.useState("");

  const handleSendNewPassword = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/change-password?token=${tokenstr}`,
        {
          username: username,
          password: newPassword,
          token: tokenstr,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Erro ao mudar sua senha:", error);
    }
  };

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
              height="26rem"
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
                    label="Nova Senha"
                    placeholder="Digite sua nova senha..."
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  ></InputFormComponent>

                  <InputFormComponent
                    label="Token"
                    placeholder="Digite o token fornecido..."
                    type="text"
                    value={tokenstr}
                    onChange={(e) => setTokenstr(e.target.value)}
                  ></InputFormComponent>

                  <Row className="d-flex justify-content-center mt-4">
                    <ButtonComponent
                      text="Enviar"
                      sizeRound="8px"
                      isRound={true}
                      buttonColor="#6495b0"
                      onClick={() => handleSendNewPassword()}
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
