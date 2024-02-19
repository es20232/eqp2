import React, { useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import NavBarComponent from "../../components/NavBarComponent";
import ContainerComponent from "../../components/ContainerComponent";
import ProfileImage from "../../components/ProfileImage";
import ButtonComponent from "../../components/ButtonComponent";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { Image } from "react-bootstrap";
import InputFormComponent from "../../components/InputFormComponent";
import AlertNoLogin from "../../AlertNoLogin";

const CardFeedImage = (props) => {
  return (
    <>
      <Card.Title className="text-start mt-2 mb-2">
        <div style={{ marginLeft: "1.1rem" }}>
          <ProfileImage
            imageURL={props.imageURL}
            altText="Profile Image"
            size="45px" // Tamanho menor
            allowChange={false}
          />
          <span
            className="ms-2"
            style={{ color: "#4d4d4d", fontWeight: "bold" }}
          >
            {props.name}
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
              sizeRound="8px"
            />
            {"  "}
            <ButtonComponent
              textColor="white"
              text={<FaThumbsDown />}
              size="48px"
              buttonColor="#ff0000"
              sizeRound="8px"
            />
          </Col>
          <Col xs="auto">
            <ButtonComponent
              to="/comments"
              buttonColor="#4d4d4d"
              textColor="white"
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
  const [postImage, setPostImage] = useState(null);
  const [publish, setPublish] = useState(false);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/posts");
        console.log(response.data);
        const postsWithFullMediaUrl = response.data.map((post) => ({
          ...post,
          media: `http://localhost:8080${post.media}`,
        }));

        setPosts(postsWithFullMediaUrl);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const [userData, setUserData] = useState({
    img: null, // Foto do usuário
  });
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user");
        response.data.img = "http://localhost:8080/" + response.data.img;
        setUserData(response.data);
        setLoading(false);
        setIsLoggedIn(true);

        const responseUsers = await axios.get(
          "http://localhost:8080/api/users"
        );
        console.log(responseUsers.data);
        setUsers(responseUsers.data);
      } catch (error) {
        console.error("Erro ao recuperar dados do usuário:", error);
        setLoading(false);
        setIsLoggedIn(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!isLoggedIn) {
    return <AlertNoLogin />;
  }

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setPostImage(file);
  // };

  // const handleUploadImage = () => {
  //   const formData = new FormData();
  //   formData.append("image", postImage);

  //   axios
  //     .post("http://sua-api.com/upload", formData)
  //     .then((response) => {
  //       console.log("Imagem enviada com sucesso:", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Erro ao enviar imagem:", error);
  //     });
  // };

  return (
    <>
      <NavBarComponent />
      <Container className="d-flex flex-column align-items-center">
        <div style={{ marginTop: "5rem" }}></div>

        {publish ? (
          <ContainerComponent
            colorBackground="#e6e6e6"
            width="32rem"
            content={
              <div>
                <Row>
                  <Col xs={3}>
                    <Image
                      height={100}
                      width={100}
                      src="https://htmlcolorcodes.com/assets/images/colors/bright-blue-color-solid-background-1920x1080.png"
                    ></Image>
                  </Col>
                  <Col xs={9}>
                    <InputFormComponent
                      as="textarea"
                      label="Insira uma legenda:"
                      value={caption}
                      placeholder="Digite uma legenda..."
                      onChange={(e) => setCaption(e.target.value)}
                    ></InputFormComponent>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-center mt-2">
                    <ButtonComponent
                      buttonColor="#4b89be"
                      textColor="white"
                      text="Publicar"
                      size="130px"
                      sizeRound="8px"
                      onClick={() => setPublish(!publish)}
                    />
                  </Col>
                </Row>
              </div>
            }
            padding="p-3"
          />
        ) : (
          <ContainerComponent
            colorBackground="#e6e6e6"
            width="32rem"
            content={
              <Row className="d-flex justify-content-between align-items-center">
                <Col xs="auto">
                  <p className="mt-3">Crie uma nova publicação!</p>
                </Col>
                <Col xs="auto">
                  {/* <input type="file" onChange={handleImageChange} /> */}
                  <ButtonComponent
                    buttonColor="#4b89be"
                    textColor="white"
                    text="Publicar"
                    size="130px"
                    sizeRound="8px"
                    onClick={() => {
                      setPublish(true);
                    }}
                  />
                </Col>
              </Row>
            }
            padding="p-3"
          />
        )}

        {posts.map((post) => {
          return (
            <ContainerComponent
              colorBackground="#e6e6e6"
              width="32rem"
              padding="p-0"
              content={
                <CardFeedImage
                  imageURL={
                    // users.id === posts.id_user
                    //   ? users.img
                    //   : "https://htmlcolorcodes.com/assets/images/colors/bright-blue-color-solid-background-1920x1080.png"
                    userData.img
                  }
                  name={userData.name}
                  altText={post.id}
                  srcImage={post.media}
                  caption={post.caption}
                />
              }
            />
          );
        })}
      </Container>
    </>
  );
}
