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
import profileIcon from "../../images/profile-icon-design-free-vector.jpg";

const CardFeedImage = (props) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const handleLike = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/send-like", {
        post_id: props.postId,
        user_id: props.userId,
        weight: true,
      });
      console.log("Like enviado com sucesso:", response.data);
      alert("Like enviado com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao enviar like:", error);
      // Tratar o erro, se necessário
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/send-like", {
        post_id: props.postId,
        user_id: props.userId,
        weight: false,
      });
      console.log("Dislike enviado com sucesso:", response.data);
      alert("Dislike enviado com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao enviar dislike:", error);
      // Tratar o erro, se necessário
    }
  };

  useEffect(() => {
    // Buscar a contagem de likes e deslikes do backend
    const fetchLikesAndDislikes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/get-likes?post_id=${props.post_id}`
        );
        const likes = response.data.filter(
          (like) => like.weight === true
        ).length;
        const dislikes = response.data.filter(
          (like) => like.weight === false
        ).length;
        setLikeCount(likes);
        setDislikeCount(dislikes);
      } catch (error) {
        console.error("Erro ao buscar likes e dislikes:", error);
      }
    };

    fetchLikesAndDislikes();
  }, []);

  return (
    <>
      <Card.Title className="text-start mt-2 mb-2">
        <div style={{ marginLeft: "1.1rem" }}>
          <ProfileImage
            imageURL={props.imageURL ? props.imageURL : profileIcon}
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
              onClick={handleLike}
            />
            <span className="ms-2 ml-2 mr-3">{likeCount}</span>
            {"  "}
            <ButtonComponent
              textColor="white"
              text={<FaThumbsDown />}
              size="48px"
              buttonColor="#ff0000"
              sizeRound="8px"
              onClick={handleDislike}
            />
            <span className="ms-2 ml-2 mr-3">{dislikeCount}</span>
          </Col>
          <Col xs="auto">
            <ButtonComponent
              to={`/comments/${props.post_id}`}
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
  const [publish, setPublish] = useState(false);
  const [caption, setCaption] = useState("");

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
      } catch (error) {
        console.error("Erro ao recuperar dados do usuário:", error);
        setLoading(false);
        setIsLoggedIn(false);
      }
    };

    checkAuthentication();
  }, []);

  const [image, setImage] = useState(null);
  const [erro, setErro] = useState(null);

  const handleInputChange = (event) => {
    if (event.target.name === "caption") {
      setCaption(event.target.value);
    } else if (event.target.name === "POST_IMAGE") {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("POST_IMAGE", image);

      const response = await axios.post(
        "http://localhost:8080/api/create-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Postagem criada com sucesso:", response.data);

      // Limpar campos e recarregar a página após envio bem-sucedido
      setCaption("");
      setImage(null);
      window.location.reload(); // Recarrega a página
    } catch (error) {
      setErro(error.response.data.detail);
      console.error("Erro ao criar postagem:", error);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!isLoggedIn) {
    return <AlertNoLogin />;
  }

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
                      name="caption"
                      onChange={(e) => handleInputChange(e)}
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
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="caption">Legenda:</label>
                      <input
                        type="text"
                        id="caption"
                        name="caption"
                        value={caption}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="image">Imagem:</label>
                      <input
                        type="file"
                        id="image"
                        name="POST_IMAGE"
                        onChange={handleInputChange}
                      />
                    </div>
                    <button type="submit">Enviar</button>
                  </form>
                </Col>
              </Row>
            }
            padding="p-3"
          />
        )}

        {posts
          .slice()
          .reverse()
          .map((post) => {
            return (
              <ContainerComponent
                colorBackground="#e6e6e6"
                width="32rem"
                padding="p-0"
                content={
                  <CardFeedImage
                    imageURL={
                      userData.img === null ? userData.img : profileIcon
                    }
                    name={post.name}
                    altText={post.id}
                    srcImage={post.image}
                    caption={post.caption}
                    postId={post.id}
                    userId={userData.id}
                    post_id={post.id}
                  />
                }
              />
            );
          })}
      </Container>
    </>
  );
}
