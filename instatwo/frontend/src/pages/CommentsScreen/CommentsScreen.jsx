import React, { useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import NavBarComponent from "../../components/NavBarComponent";
import ContainerComponent from "../../components/ContainerComponent";
import ProfileImage from "../../components/ProfileImage";
import ButtonComponent from "../../components/ButtonComponent";
import InputFormComponent from "../../components/InputFormComponent";
import { useState } from "react";

export default function CommentsScreen() {
  const [comments, setComments] = useState();

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
              <Card.Body>
                <Card.Text>
                  <p>
                    <span style={{ color: "#4d4d4d", fontWeight: "bold" }}>
                      Nome
                    </span>{" "}
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old.
                  </p>
                </Card.Text>
                <Card.Text>
                  <p>
                    <span style={{ color: "#4d4d4d", fontWeight: "bold" }}>
                      Nome
                    </span>{" "}
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old.
                  </p>
                </Card.Text>
                <Card.Text>
                  <p>
                    <span style={{ color: "#4d4d4d", fontWeight: "bold" }}>
                      Nome
                    </span>{" "}
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old.
                  </p>
                </Card.Text>

                <hr className="my-2" />

                <div style={{ marginTop: "10%" }}>
                  <Row>
                    <Col>
                      <InputFormComponent
                        as="textarea"
                        label="Comentar:"
                        value={comments}
                        placeholder="Insira um comentario..."
                        //   onChange={(e) => setCaption(e.target.value)}
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
                        onChange={() => setComments(comments)}
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
