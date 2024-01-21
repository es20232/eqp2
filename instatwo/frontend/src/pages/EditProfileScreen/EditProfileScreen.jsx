import React from "react";
import NavBarComponent from "../../components/NavBarComponent";
import { Container, Row, Col } from "react-bootstrap";
import ProfileImage from "../../components/ProfileImage";
import { FaEdit } from "react-icons/fa";
import ContainerComponent from "../../components/ContainerComponent";
import InputFormComponent from "../../components/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent";

const CircularIcon = () => {
  return (
    <div
      style={{
        marginTop: "-70px",
        marginLeft: "110px",
        height: "80px",
        width: "80px",
        borderRadius: "50%",
        backgroundColor: "#999999",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FaEdit size={26} color="white" />
    </div>
  );
};

const ImageProfileEdit = () => {
  return (
    <Row className="mb-4">
      <Col>
        <div className="d-flex justify-content-center align-items-center">
          <div>
            <ProfileImage
              imageURL="https://htmlcolorcodes.com/assets/images/colors/bright-blue-color-solid-background-1920x1080.png"
              altText="Profile Image"
              size="200px"
            />
            <div className="d-flex justify-content-center">
              <CircularIcon></CircularIcon>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default function EditProfileScreen() {
  return (
    <div>
      <NavBarComponent></NavBarComponent>
      <Container className="d-flex justify-content-center align-items-center">
        <div style={{marginTop: '4rem'}}>
        <ContainerComponent
          colorBackground="#e6e6e6"
          height="32rem"
          content={
            <Col className="align-items-center">
              <ImageProfileEdit />
              <InputFormComponent
                type="text"
                label="Novo Nome"
                placeholder="Digite o novo nome..."
              ></InputFormComponent>
              <InputFormComponent
                type="text"
                label="Nova Bio"
                placeholder="Digite a nova bio..."
              ></InputFormComponent>
              <Row className="d-flex justify-content-center mt-4">
                <ButtonComponent textColor="white" text="Salvar" />
              </Row>
            </Col>
          }
        />
        </div>
      </Container>
    </div>
  );
}
