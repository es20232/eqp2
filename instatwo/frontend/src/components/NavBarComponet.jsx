import React from "react";
import { useState } from "react";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import ProfileImage from "./ProfileImage"; // Substitua pelo caminho real do seu componente

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
      <Navbar className="justify-content-between" style={navbarStyle}>
        <Container>
          <Navbar.Brand href="#home" style={logoStyle}>
            InstaTwo
          </Navbar.Brand>
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
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBarComponent;