import { React, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import ProfileImage from "../../components/ProfileImage";
import ButtonComponent from "../../components/ButtonComponent";

const LimitedText = ({ text, limit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p className={isExpanded ? "" : "text-truncate"} style={{ color: "#4d4d4d", fontWeight:"lighter" }}>
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
  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Container fluid className="d-flex justify-content-center vh-90">
      <Row className="d-flex ">
        <Col xs="auto" style={{ marginRight: "40px" }}>
          <ProfileImage
            imageURL="https://htmlcolorcodes.com/assets/images/colors/bright-blue-color-solid-background-1920x1080.png"
            altText="Profile Image"
            size="150px"
          />
        </Col>
        <Col xs="auto" style={{ maxWidth: "400px", maxHeight: "100px" }}>
          <h1 style={{ color:"#0d263d", fontWeight:"bold "}}>Nome</h1>
          <p style={{ color: "#999999", fontWeight:"normal" }}>@Nick</p>
          <LimitedText text={loremIpsum} limit={100} />
        </Col>

        <Col>
          <Row>
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <h1 style={{ color:"#4d4d4d", fontWeight:"bold "}}>123</h1>
              <p style={{ color:"#4d4d4d", fontWeight:"bold "}}>Seguidores</p>
              <ButtonComponent
                sizeRound="8px"
                isRound={true}
                text="Sair"
                buttonColor="#4d4d4d"
              />
            </Col>
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <h1 style={{ color:"#4d4d4d", fontWeight:"bold "}}>567</h1>
              <p style={{ color:"#4d4d4d", fontWeight:"bold "}}>Seguindo</p>
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
