import React, { useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import NavBarComponent from "../../components/NavBarComponent";
import ContainerComponent from "../../components/ContainerComponent";
import ProfileImage from "../../components/ProfileImage";
import ButtonComponent from "../../components/ButtonComponent";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

const CardFeedImage = (props) => {
  return (
    <>
      <Card.Title className="text-start mt-2 mb-2">
        <div style={{ marginLeft: "1.1rem" }}>
          <ProfileImage
            imageURL={
              "https://htmlcolorcodes.com/assets/images/colors/bright-blue-color-solid-background-1920x1080.png"
            }
            altText="Profile Image"
            size="45px" // Tamanho menor
            allowChange={false}
          />
          <span
            className="ms-2"
            style={{ color: "#4d4d4d", fontWeight: "bold" }}
          >
            Nome
          </span>
        </div>
      </Card.Title>
      <Card.Img
        src={props.srcImage}
        alt={props.altText}
        className="img-fluid"
        style={{ height: "500px" }}
      />
      <Card.Body>
        <Card.Text
          style={{
            marginLeft: "1.2rem",
            marginRight: "1.2rem",
            marginTop: "1.2rem",
          }}
        >
          {props.caption}
        </Card.Text>
        <Row
          className="justify-content-between"
          style={{
            marginLeft: "1.2rem",
            marginRight: "1.2rem",
            marginBottom: "1.3rem",
          }}
        >
          <Col>
            <ButtonComponent
              textColor="white"
              text={<FaThumbsUp />}
              size="48px"
              buttonColor="#267094"
            />
            {"  "}
            <ButtonComponent
              textColor="white"
              text={<FaThumbsDown />}
              size="48px"
              buttonColor="#ff0000"
            />
          </Col>
          <Col xs="auto">
            <ButtonComponent
              buttonColor="#999999"
              textColor="#4d4d4d"
              text="Comentários"
              size="118px"
            />
          </Col>
        </Row>
      </Card.Body>
    </>
  );
};

export default function DashBoardScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
          const response = await axios.get("http://localhost:8080/api/posts");
          console.log(response.data);
          const postsWithFullMediaUrl = response.data.map(post => ({
              ...post,
              media: `http://localhost:8080${post.media}`
          }));

          setPosts(postsWithFullMediaUrl);
      } catch (error) {
          console.error('Error fetching posts:', error);
      }
  };

  fetchPosts();
  }, []);

  return (
    <>
      <NavBarComponent />
      <Container className="d-flex flex-column align-items-center">
        <div style={{ marginTop: "5rem" }}></div>
        <ContainerComponent
          colorBackground="#e6e6e6"
          width="32rem"
          content={
            <Row className="d-flex justify-content-between align-items-center">
              <Col xs="auto">
                <p className="mt-3">Crie uma nova publicação!</p>
              </Col>
              <Col xs="auto">
                <ButtonComponent
                  buttonColor="#4b89be"
                  textColor="white"
                  text="Escolher"
                  size="130px"
                  sizeRound="8px"
                />
              </Col>
            </Row>
          }
          padding="p-3"
        />

        {posts.map((post) => {return (
          <ContainerComponent
            colorBackground="#e6e6e6"
            width="32rem"
            padding="p-0"
            content={
              <CardFeedImage
                altText={post.id}
                srcImage={post.media}
                caption={post.caption}
              />
            }
          />
        );})}
      </Container>
    </>
  );
}
