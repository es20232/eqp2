import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import NavBarComponent from "../../components/NavBarComponent";
import ContainerComponent from "../../components/ContainerComponent";
import ProfileImage from "../../components/ProfileImage";
import ButtonComponent from "../../components/ButtonComponent";
import InputFormComponent from "../../components/InputFormComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertNoLogin from "../../AlertNoLogin";
import { useParams } from "react-router-dom";
import profileIcon from "../../images/profile-icon-design-free-vector.jpg";

export default function CommentsScreen() {
  const [comments, setComments] = useState();
  const [userData, setUserData] = useState({
    img: null, // Foto do usuário
  });
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [likes, setLikes] = useState([]);
  const { post_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Solicitar dados do usuário
        const userDataResponse = await axios.get(
          "http://localhost:8080/api/user"
        );
        userDataResponse.data.img =
          "http://localhost:8080/" + userDataResponse.data.img;
        setUserData(userDataResponse.data);

        console.log(post_id);

        // Solicitar likes/deslikes do post
        const likesResponse = await axios.get(
          `http://localhost:8080/api/get-likes?post_id=${post_id}`
        );
        setLikes(likesResponse.data);

        setLoading(false);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Erro ao recuperar dados do usuário:", error);
        setLoading(false);
        setIsLoggedIn(false);
      }
    };

    fetchData();
  }, []);

  const enviarComentario = async (post_id, text) => {
    console.log("Enviando comentário:", post_id, text);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/post-comment",
        { post_id, text }
      );
      console.log("Comentário postado:", response.data);
      setComments("");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao postar comentário:", error);
      // Trate o erro, se necessário
    }
  };

  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const obterComentarios = async (post_id) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/get-comments?post_id=${post_id}`
        );
        setComentarios(response.data);
        console.log("Comentários:", response.data);
      } catch (error) {
        console.error("Erro ao recuperar comentários:", error);
      }
    };

    obterComentarios(post_id);
  }, []);

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

        <ContainerComponent
          colorBackground="#e6e6e6"
          width="32rem"
          content={
            <>
              <Card.Title className="text-start">
                <div className="mb-2">
                  <ProfileImage
                    imageURL={
                      userData.img === null ? userData.img : profileIcon
                    }
                    altText="Profile Image"
                    size="45px" // Tamanho menor
                    allowChange={false}
                  />
                  <span
                    className="ms-2"
                    style={{ color: "#4d4d4d", fontWeight: "bold" }}
                  >
                    {userData.name}
                  </span>
                </div>
              </Card.Title>
              <hr className="my-2" />
              <Card.Body>
                {likes.map((like, index) => (
                  <CommentLike
                    key={index}
                    userName={like.liked_by.username}
                    action={like.weight}
                    timestamp={like.liked_at}
                    profileImg={null}
                  />
                ))}
                <hr className="my-2" />
                {comentarios.map((comentario, index) => (
                  <Comment
                    key={index}
                    author={comentario.author.username}
                    text={comentario.text}
                  />
                ))}
                <hr className="my-2" />

                <div style={{ marginTop: "10%" }}>
                  <Row>
                    <Col>
                      <InputFormComponent
                        as="textarea"
                        label="Comentar:"
                        value={comments}
                        placeholder="Insira um comentario..."
                        onChange={(e) => setComments(e.target.value)}
                      ></InputFormComponent>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex justify-content-center mt-2">
                      <ButtonComponent
                        buttonColor="#4b89be"
                        textColor="white"
                        text="Comentar"
                        size="130px"
                        sizeRound="8px"
                        onClick={
                          comments
                            ? () => enviarComentario(post_id, comments)
                            : () => {}
                        }
                      />
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </>
          }
        />
      </Container>
    </>
  );
}

function Comment({ author, text, key }) {
  return (
    <>
      <Card.Text key={key}>
        <p>
          <span style={{ color: "#4d4d4d", fontWeight: "bold" }}>{author}</span>{" "}
          {text}
        </p>
      </Card.Text>
    </>
  );
}

function CommentLike({ userName, action, timestamp, profileImg }) {
  const likedAt = new Date(timestamp);

  const formattedDate = likedAt.toLocaleDateString();
  const formattedTime = likedAt.toLocaleTimeString();

  return (
    <>
      <Card.Text>
        <div className="mb-2">
          <span
            className="ms-2"
            style={{ color: "#4d4d4d", fontWeight: "bold" }}
          >
            {userName}
          </span>{" "}
          {action ? "Curtiu" : "Descurtiu"} sua postagem -{" "}
          <span>{formattedDate + " às " + formattedTime}</span>
        </div>
      </Card.Text>
    </>
  );
}
