import { React, useState, useEffect } from "react";
import { Row, Col, Container, Button} from "react-bootstrap";
import ProfileImage from "../../components/ProfileImage";
import ButtonComponent from "../../components/ButtonComponent";
import axios from "axios";
import AlertNoLogin from "../../AlertNoLogin";
import profileIcon from "../../images/profile-icon-design-free-vector.jpg";

const LimitedText = ({ text, limit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p
        className={isExpanded ? "" : "text-truncate"}
        style={{ color: "#4d4d4d", fontWeight: "lighter" }}
      >
        {isExpanded ? text : `${text.slice(0, limit)}...`}
      </p>
      {isExpanded ? (
        <Button variant="link" onClick={toggleExpanded} className="btn-sm">
          ler menos...
        </Button>
      ) : (
        <Button variant="link" onClick={toggleExpanded} className="btn-sm">
          ler mais...
        </Button>
      )}
    </div>
  );
};

function UserInformation() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user");
        console.log(response.data);
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

  const handleLogout = async () => {

    try {
      await axios.post("http://localhost:8080/api/logout");
      window.location.reload();
      setIsLoggedIn(false)
      
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleImageChange = async (file) => {
    // Faça o upload da imagem para o backend
    try {
      const formData = new FormData();
      formData.append("user_images", file);
      await axios.post("http://localhost:8080/api/edit-profile", formData);
      // Atualize a imagem exibida após o upload
      const response = await axios.get("http://localhost:8080/api/user");
      setUserData(response.data);
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!isLoggedIn) {
    return (
      <AlertNoLogin/>
    );
  }

  const bioInfo =
    "Adicione uma foto sua e fale um pouco sobre você, o que gosta de fazer, quais são seus hobbies, etc. ";

  return (
    <Container fluid className="d-flex justify-content-center vh-90">
      <Row className="d-flex ">
        <Col xs="auto" style={{ marginRight: "40px" }}>
          <ProfileImage
            imageURL={userData.img ? userData.img : profileIcon}
            altText="Profile Image"
            size="150px"
            onImageChange={handleImageChange} // Passa a função de manipulação de imagem
          />
        </Col>
        <Col xs="auto" style={{ maxWidth: "400px", maxHeight: "100px" }}>
          <h1 style={{ color: "#0d263d", fontWeight: "bold " }}>
            {userData.name}
          </h1>
          <p style={{ color: "#999999", fontWeight: "normal" }}>
            @{userData.username}
          </p>
          <LimitedText text={userData.bio ? userData.bio : bioInfo} limit={50} />
        </Col>

        <Col style={{marginLeft: "10rem"}}>
          <Row>
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <h1 style={{ color: "#4d4d4d", fontWeight: "bold " }}>0</h1>
              <p style={{ color: "#4d4d4d", fontWeight: "bold " }}>
                Seguidores
              </p>
              <ButtonComponent
                sizeRound="8px"
                isRound={true}
                text="Sair"
                buttonColor="#4d4d4d"
                onClick={() => handleLogout()}
              />
            </Col>
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <h1 style={{ color: "#4d4d4d", fontWeight: "bold " }}>0</h1>
              <p style={{ color: "#4d4d4d", fontWeight: "bold " }}>Seguindo</p>
              <ButtonComponent
                sizeRound="8px"
                isRound={true}
                text="Editar"
                to="/profile/edit"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default UserInformation;
