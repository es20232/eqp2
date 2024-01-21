import React from "react";
import { Container } from "react-bootstrap";

function ContainerComponent(props) {

  let padding = props.padding || "p-4";

  const styleContainer = {
    height: props.height || "auto",
    width: props.width || "22rem",
    backgroundColor: props.colorBackground,
    borderRadius: "20px",
    display: "inline-block",
  };

  return (
    <Container className={`${padding} m-3`} style={styleContainer}>
      {props.content}
    </Container>
  );
}

export default ContainerComponent;
