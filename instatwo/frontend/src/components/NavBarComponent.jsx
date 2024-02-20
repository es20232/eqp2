import React from "react";
import { useState } from "react";
import { Navbar, Container, Row, Col, Nav } from "react-bootstrap";
import ProfileImage from "./ProfileImage";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import profileIcon from "../images/profile-icon-design-free-vector.jpg";
import Form from "react-bootstrap/Form";
import img02 from "../images/img02.png";

function NavBarComponent() {
  const [userData, setUserData] = useState({});
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

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/search-profiles`
      );
      setSearchResults(response.data);
      console.log("Usuários encontrados:", searchResults);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(); // Chama a função de busca sempre que o valor do campo de entrada muda
  };

  return (
    <div>
      <Navbar className="justify-content-between fixed-top" style={navbarStyle}>
        <Container>
          <Navbar.Brand
            href={isLoggedIn ? "/dashboard" : "/"}
            style={logoStyle}
          >
            <img src={img02} alt="Logo" style={{ width: "180px" }} />
          </Navbar.Brand>

          {isLoggedIn && (
            <Col style={{ marginLeft: "50px", marginRight: "50px" }}>
              <Form
                className="d-flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(e.target.value);
                }}
              >
                <Form.Control
                  type="search"
                  placeholder="Pesquisar usuários..."
                  className="me-2"
                  aria-label="Search"
                  style={{
                    backgroundColor: "#446889",
                    color: "#13293d",
                    fontStyle: "bold",
                    height: "45px",
                    border: "none", // Remover borda
                    outline: "none", // Remover contorno ao focar
                  }}
                  onFocus={(e) => (e.target.style.backgroundColor = "#ffffff")} // Alterar cor de fundo ao focar
                  onBlur={(e) => (e.target.style.backgroundColor = "#446889")} // Restaurar cor de fundo ao perder foco
                  value={searchTerm}
                  onChange={(e) => {handleChange(e)}}
                />
              </Form>
              {searchResults.map((user, index) => (
                <div key={index}>
                  <p>{user.username}</p>
                </div>
              )) }
            </Col>
          )}

          <Row>
            <Col xs="auto">
              {!isLoggedIn && (
                <Nav className="me-auto">
                  <Nav.Link href="/auth/login" style={{ color: "white" }}>
                    Entrar
                  </Nav.Link>
                  <Nav.Link href="/auth/register" style={{ color: "white" }}>
                    Cadastre-se
                  </Nav.Link>
                </Nav>
              )}
              {isLoggedIn && (
                <Container>
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    <Row
                      className="align-items-center no-gutters p-0 m-0"
                      style={rowStyle}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Col xs="auto" className="p-0 m-0">
                        <Navbar.Brand
                          href="/profile"
                          style={{ color: "white", fontSize: "18px" }}
                        >
                          {userData.username}
                        </Navbar.Brand>
                      </Col>
                      <Col xs="auto" className="p-0 m-0">
                        <Navbar.Brand>
                          <ProfileImage
                            imageURL={
                              userData.img ? userData.img : profileIcon
                            }
                            altText="Profile Image"
                            size="45px" // Tamanho menor
                          />
                        </Navbar.Brand>
                      </Col>
                    </Row>
                  </Link>
                </Container>
              )}
            </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBarComponent;
