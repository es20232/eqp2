import React from "react";
import NavBarComponent from "../../components/NavBarComponent";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProfileImage from "../../components/ProfileImage";
import { FaEdit } from "react-icons/fa";
import ContainerComponent from "../../components/ContainerComponent";
import InputFormComponent from "../../components/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertNoLogin from "../../AlertNoLogin";
import profileIcon from "../../images/profile-icon-design-free-vector.jpg";
import Form from "react-bootstrap/Form";

const ImageProfileEdit = (props) => {
  return (
    <Row className="mb-4">
      <Col>
        <div className="d-flex justify-content-center align-items-center">
          <div>
            <ProfileImage
              imageURL={props.img ? props.img : props.profileIcon}
              altText="Profile Image"
              size="200px"
              onImageChange={props.handleImageChange}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default function EditProfileScreen() {
  const [userData, setUserData] = useState({
    img: null, // Foto do usuário
  });
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user");
        response.data.img = "http://localhost:8080/" + response.data.img;
        setUserData(response.data);
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

  const [newEmail, setNewEmail] = useState(userData.email);
  const [newPassword, setNewPassword] = useState(userData.password);
  const [newName, setNewName] = useState(userData.name);
  const [newUsername, setNewUsername] = useState(userData.username);
  const [newBio, setNewBio] = useState(userData.bio);
  const [user_images, setUserImage] = useState(null);

  const navigate = useNavigate();

  const handleEditProfile = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/edit-profile",
        {
          newEmail,
          newPassword,
          newName,
          newBio,
          newUsername,
          user_images: user_images,
        },
        {
          withCredentials: true, // Certifique-se de incluir cookies na solicitação
        }
      );

      // Limpe os campos do formulário ou faça outras ações necessárias
      setNewEmail("");
      setNewPassword("");
      setNewName("");
      setNewBio("");
      setNewUsername("");
      setUserImage(null);

      alert("Perfil editado com sucesso!");

      // Redirecione para a página de perfil após a edição
      navigate("/profile");
    } catch (error) {
      console.error("Erro ao editar perfil:", error.response.data.message);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!isLoggedIn) {
    return <AlertNoLogin />;
  }

  return (
    <div>
      <NavBarComponent></NavBarComponent>
      <Container className="d-flex justify-content-center align-items-center">
        <div style={{ marginTop: "8rem" }}>
          <ContainerComponent
            colorBackground="#e6e6e6"
            height="54rem"
            content={
              <Col className="align-items-center">
                <ImageProfileEdit
                  img={userData.img}
                  profileIcon={profileIcon}
                />
                <Form>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control
                      type="file"
                      onChange={(e) => setUserImage(e.target.files[0])}
                    />
                  </Form.Group>
                </Form>
                <InputFormComponent
                  type="text"
                  label="Novo Email"
                  value={newEmail}
                  placeholder="Digite o novo email..."
                  onChange={(e) => setNewEmail(e.target.value)}
                ></InputFormComponent>
                <InputFormComponent
                  type="password"
                  label="Nova Senha"
                  value={newPassword}
                  placeholder="Digite a nova senha..."
                  onChange={(e) => setNewPassword(e.target.value)}
                ></InputFormComponent>
                <InputFormComponent
                  type="text"
                  label="Novo nome"
                  value={newName}
                  placeholder="Digite seu novo nome..."
                  onChange={(e) => setNewName(e.target.value)}
                ></InputFormComponent>
                <InputFormComponent
                  type="text"
                  label="Novo nome de usuário"
                  value={newUsername}
                  placeholder="Digite seu novo nome de usuario..."
                  onChange={(e) => setNewUsername(e.target.value)}
                ></InputFormComponent>
                <InputFormComponent
                  as="textarea"
                  label="Nova bio"
                  value={newBio}
                  placeholder="Digite a nova bio..."
                  onChange={(e) => setNewBio(e.target.value)}
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
