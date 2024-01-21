import React from "react";
import { useState } from "react";
import { Navbar, Container, Row, Col, Nav } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import ProfileImage from "./ProfileImage"; // Substitua pelo caminho real do seu componente
import ButtonComponent from "./ButtonComponent"; // Substitua pelo caminho real do seu componente
import { Link } from "react-router-dom";

function NavBarComponent() {
  let color_fundo = "#13293d";
  let color_texto = "white";
  let color_hover = "#006494";

  const navbarStyle = {
    backgroundColor: color_fundo, // Cor de fundo
    color: "white", // Cor do texto
  };

  const logoStyle = {
    color: color_texto, // Cor do texto
    fontSize: "30px", // Tamanho da fonte
    fontWeight: "bold", // Negrito
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const rowStyle = {
    backgroundColor: isHovered ? color_hover : "transparent", // Cor de fundo quando hover
    transition: "background-color 0.3s ease-in-out", // Efeito de transição suave
    cursor: "pointer", // Altera o cursor ao passar o mouse
  };

  return (
    <div>
      <Navbar className="justify-content-between fixed-top" style={navbarStyle}>
        <Container>
          <Navbar.Brand href="/" style={logoStyle}>
            InstaTwo
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="/auth/login" style={{color: 'white'}}>Entrar</Nav.Link>
            <Nav.Link href="/auth/register" style={{color: 'white'}}>Cadastre-se</Nav.Link>
          </Nav>

          <Row>
            <Col xs="auto" className="d-flex align-items-center">
            <ButtonComponent
              textColor="white"
              text={<FaPlus/>}
              size="48px"
              isRound={'true'}
              sizeRound="50%"
              buttonColor="#267094"
            />
            </Col>

            <Col xs="auto">
              <Row
                className="align-items-center no-gutters p-0 m-0"
                style={rowStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Col xs="auto" className="p-0 m-0">
                  <Navbar.Brand
                    href="#home"
                    style={{ color: "white", fontSize: "18px" }}
                  >
                    Meu Perfil
                  </Navbar.Brand>
                </Col>
                <Col xs="auto" className="p-0 m-0">
                  <Navbar.Brand>
                    <ProfileImage
                      imageURL="https://htmlcolorcodes.com/assets/images/colors/bright-blue-color-solid-background-1920x1080.png"
                      altText="Profile Image"
                      size="45px" // Tamanho menor
                    />
                  </Navbar.Brand>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBarComponent;
