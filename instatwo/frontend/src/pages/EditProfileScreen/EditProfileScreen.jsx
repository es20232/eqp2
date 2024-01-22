import React from "react";
import NavBarComponent from "../../components/NavBarComponent";
import { Container, Row, Col } from "react-bootstrap";
import ProfileImage from "../../components/ProfileImage";
import { FaEdit } from "react-icons/fa";
import ContainerComponent from "../../components/ContainerComponent";
import InputFormComponent from "../../components/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import AlertNoLogin from "../../AlertNoLogin";

const CircularIcon = () => {
  return (
    <div
      style={{
        marginTop: "-70px",
        marginLeft: "110px",
        height: "80px",
        width: "80px",
        borderRadius: "50%",
        backgroundColor: "#999999",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FaEdit size={26} color="#4d4d4d" />
    </div>
  );
};

const ImageProfileEdit = () => {
  return (
    <Row className="mb-4">
      <Col>
        <div className="d-flex justify-content-center align-items-center">
          <div>
            <ProfileImage
              imageURL="https://htmlcolorcodes.com/assets/images/colors/bright-blue-color-solid-background-1920x1080.png"
              altText="Profile Image"
              size="200px"
            />
            <div className="d-flex justify-content-center">
              <CircularIcon></CircularIcon>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default function EditProfileScreen() {

  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleEditProfile = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/edit-profile',
        {
          newEmail,
          newPassword,
        },
        {
          withCredentials: true,  // Certifique-se de incluir cookies na solicitação
        }
      );

      // Limpe os campos do formulário ou faça outras ações necessárias
      setNewEmail('');
      setNewPassword('');

      // Redirecione para a página de perfil após a edição
      navigate('/profile');
    } catch (error) {
      console.error('Erro ao editar perfil:', error.response.data.message);
    }
  };

  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user");
        setLoading(false);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Erro ao recuperar dados do usuário:", error);
        setLoading(false);
        setIsLoggedIn(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!isLoggedIn) {
    return (
      <AlertNoLogin/>
    );
  }

  return (
    <div>
      <NavBarComponent></NavBarComponent>
      <Container className="d-flex justify-content-center align-items-center">
        <div style={{ marginTop: "8rem" }}>
          <ContainerComponent
            colorBackground="#e6e6e6"
            height="32rem"
            content={
              <Col className="align-items-center">
                <ImageProfileEdit />
                <InputFormComponent
                  type="text"
                  label="Novo Email"
                  value={newEmail}
                  placeholder="Digite o novo email..."
                  onChange={(e) => setNewEmail(e.target.value)}
                ></InputFormComponent>
                <InputFormComponent
                  type="text"
                  label="Nova Senha"
                  value={newPassword}
                  placeholder="Digite a nova senha..."
                  onChange={(e) => setNewPassword(e.target.value)}
                ></InputFormComponent>
                <Row>
                  <Col className="d-flex justify-content-center mt-2">
                    <ButtonComponent
                      textColor="white"
                      text="Salvar"
                      sizeRound="8px"
                      isRound={true}
                      onClick={() => handleEditProfile()}
                    />
                  </Col>
                </Row>
              </Col>
            }
          />
        </div>
      </Container>
    </div>
  );
}
