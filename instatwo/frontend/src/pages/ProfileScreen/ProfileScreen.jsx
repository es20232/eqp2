import React from "react";
import NavBarComponent from "../../components/NavBarComponent";
import { Container } from "react-bootstrap";
import UserInformation from "./UserInformation";
import { Image, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertNoLogin from "../../AlertNoLogin";

function ProfileScreen() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user");
        console.log(response.data);
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

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/feed");
        console.log(response.data);
        const postsWithFullMediaUrl = response.data.map((post) => ({
          ...post,
          image: `http://localhost:8080${post.image}`,
        }));

        setPosts(postsWithFullMediaUrl);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!isLoggedIn) {
    return <AlertNoLogin />;
  }

  return (
    <div>
      <NavBarComponent></NavBarComponent>
      <Container className="ml-5 d-flex align-items-center">
        <div style={{ marginTop: "24rem" }}></div>
        <UserInformation></UserInformation>
      </Container>

      <Container>
        <Row>
          {posts.map((post) => {
            if (post.user === userData.id) {
              return (
                <Col className="mt-2" xs={6} md={4}>
                  <Image
                    alt={post.image}
                    src={post.image}
                    height={400}
                    width={400}
                    rounded
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{ transition: "margin-top 5s ease" }} // Adiciona uma transição suave
                  />
                </Col>
              );
            }
          })}
        </Row>
        <div style={{ marginBottom: "2.5rem" }}></div>
      </Container>
    </div>
  );
}

export default ProfileScreen;
