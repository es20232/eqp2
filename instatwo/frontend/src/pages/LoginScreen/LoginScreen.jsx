import React from "react";
import ContainerComponent from "../../components/ContainerComponent";
import { Row, Col, Container } from "react-bootstrap";

function LoginScreen() {
  function LogoLoginScreen() {
    return (
      <>
        <Container
          style={{ background: "gray", width: "180px", height: "220px" }}
        ></Container>
      </>
    );
  }

  function TextAppLogin(props) {
    const center_container = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "1.3rem",
    };

    const content = {
      textAlign: "center",
    };

    return (
      <>
        <div style={center_container}>
          <div style={content}>
            <h1 style={{ color: props.colorLogoTitle, fontSize: "45px" }}>
              InstaTwo
            </h1>
            <p style={{ color: props.colorTextBelowTitle }}>
              Uma rede social para <br /> você e seus amigos.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Container fluid>
        <Row
          className="justify-content-center align-items-center"
          style={{ marginTop: "12%" }}
        >
          <Col xs="auto">
            <ContainerComponent
              colorBackground="#13293d"
              content={
                <Col className="justify-content-center align-items-center">
                  <LogoLoginScreen></LogoLoginScreen>
                  <TextAppLogin
                    colorLogoTitle="#cccccc"
                    colorTextBelowTitle="#6495b0"
                  ></TextAppLogin>
                </Col>
              }
            ></ContainerComponent>
          </Col>
          <Col xs="auto">
            <ContainerComponent
              colorBackground="#e6e6e6"
              content=""
            ></ContainerComponent>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginScreen;
