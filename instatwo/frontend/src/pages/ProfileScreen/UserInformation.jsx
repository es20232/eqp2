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

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user");
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

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!isLoggedIn) {
    return (
      <AlertNoLogin/>
    );
  }

  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Container fluid className="d-flex justify-content-center vh-90">
      <Row className="d-flex ">
        <Col xs="auto" style={{ marginRight: "40px" }}>
          <ProfileImage
            imageURL={!isLoggedIn ? profileIcon : userData.profileImageURL}
            altText="Profile Image"
            size="150px"
          />
        </Col>
        <Col xs="auto" style={{ maxWidth: "400px", maxHeight: "100px" }}>
          <h1 style={{ color: "#0d263d", fontWeight: "bold " }}>
            {userData.username}
          </h1>
          <p style={{ color: "#999999", fontWeight: "normal" }}>
            @{userData.username}
          </p>
          <LimitedText text={loremIpsum} limit={100} />
        </Col>

        <Col>
          <Row>
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <h1 style={{ color: "#4d4d4d", fontWeight: "bold " }}>123</h1>
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
              <h1 style={{ color: "#4d4d4d", fontWeight: "bold " }}>567</h1>
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
