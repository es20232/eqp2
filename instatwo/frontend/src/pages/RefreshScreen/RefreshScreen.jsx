import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ContainerComponent from "../../components/ContainerComponent";
import InputFormComponent from "../../components/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RefreshScreen() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSendUsername = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/reset-password`,
        {
          username: username,
        }
      );

      alert("Seu token de recuperação de senha foi enviado para o seu e-mail.");
      console.log(response.data);
      // Realiza a navegação para "/change_password" após o sucesso
      navigate("/change_password");
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
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
              height="20rem"
              width="23rem"
              content={
                <>
                  <h1 style={{ color: "#6495b0" }}>Recuperar Senha</h1>
                  <p>
                    Iremos mandar um e-mail com um link para recuperar sua
                    senha.
                  </p>
                  <InputFormComponent
                    label="Username"
                    placeholder="Digite seu username..."
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
