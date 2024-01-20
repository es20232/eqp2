import React from "react";
import { Container } from "react-bootstrap";

function ContainerComponent(props) {
  const styleContainer = {
    height: props.height || "25rem",
    width: "22rem",
    backgroundColor: props.colorBackground,
    borderRadius: "20px",
  };

  return (
    <Container className="p-4 m-3" style={styleContainer}>
      {props.content}
    </Container>
  );
}

export default ContainerComponent;
