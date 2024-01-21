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
      <p className={isExpanded ? "" : "text-truncate"}>
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
          <h1>Nome</h1>
          <p style={{ color: "#cccccc" }}>@Nick</p>
          <LimitedText text={loremIpsum} limit={100} />
        </Col>

        <Col>
          <Row>
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <h1>1243</h1>
              <p>seguidores</p>
              <ButtonComponent text="sair" buttonColor="#999999" />
            </Col>
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <h1>567</h1>
              <p>seguindo</p>
              <ButtonComponent text="editar" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default UserInformation;
