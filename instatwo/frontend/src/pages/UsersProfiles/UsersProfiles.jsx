import { React, useState, useEffect } from "react";
import { Row, Col, Container, Button, Navbar } from "react-bootstrap";
import ProfileImage from "../../components/ProfileImage";
import ButtonComponent from "../../components/ButtonComponent";
import axios from "axios";
import AlertNoLogin from "../../AlertNoLogin";
import profileIcon from "../../images/profile-icon-design-free-vector.jpg";
import { useParams } from "react-router-dom";
import { Image } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import ContainerComponent from "../../components/ContainerComponent";
import NavBarComponent from "../../components/NavBarComponent";

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
              buttonColor="#CE1010"
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
              sizeRound="8px"
              text="Comentários"
              size="118px"

            />
          </Col>
        </Row>
      </Card.Body>
    </>
  );
};

const LimitedText = ({ text, limit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p
        className={isExpanded ? "" : "text-truncate"}
        style={{ color: "#4d4d4d", fontWeight: "lighter" }}
      >
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

function UsersProfiles() {
  const{username} = useParams();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  console.log(username);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/profile?username=" + username);
        const response_posts = await axios.get("http://localhost:8080/api/posts?username=" + username);
        console.log(response_posts.data);
        const postsWithFullMediaUrl = response_posts.data.map((post) => ({
          ...post,
          image: `http://localhost:8080${post.image}`,
        }));
        response.data.img = "http://localhost:8080" + response.data.img;
        setUserData(response.data);
        setPosts(postsWithFullMediaUrl);
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

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!isLoggedIn) {
    return <AlertNoLogin />;
  }

  const bioInfo =
    "Adicione uma foto sua e fale um pouco sobre você, o que gosta de fazer, quais são seus hobbies, etc. ";

  return (
    <>
    <NavBarComponent></NavBarComponent>
    <div style={{marginTop: "80px"}}>
      </div>
    <Container fluid className="d-flex justify-content-center vh-90">

      <Row className="d-flex ">
        <Col xs="auto" style={{ marginRight: "40px" }}>
          <ProfileImage
            imageURL={userData.img ? userData.img : profileIcon}
            altText="Profile Image"
            size="150px"
            allowChange={false}
          />
        </Col>
        <Col xs="auto" style={{ maxWidth: "400px", maxHeight: "100px" }}>
          <h1 style={{ color: "#0d263d", fontWeight: "bold " }}>
            {userData.name}
          </h1>
          <p style={{ color: "#999999", fontWeight: "normal" }}>
            @{userData.username}
          </p>
          <LimitedText
            text={userData.bio ? userData.bio : bioInfo}
            limit={50}
          />
        </Col>
      </Row>
    </Container>
    <div style={{marginTop: "50px"}}>
      </div> 
      <Container>
        <Row>
          {posts.map((post) => {
            return ( <Col className="mt-2" xs={6} md={4}>
              <ContainerComponent
                colorBackground="#e6e6e6"
                width="32rem"
                padding="p-0"
                content={
            <CardFeedImage
                    altText={post.id}
                    srcImage={post.image}
                    caption={post.caption}
                    postId={post.id}
                    userId={userData.id}
                    post_id={post.id}
                  />
                }
              />
          </Col>);
          })}
        </Row>
        <div style={{ marginBottom: "2.5rem" }}></div>
      </Container> </>
  );
}

export default UsersProfiles;
