import React from "react";
import { Button } from "react-bootstrap";

export default function ButtonComponent(props) {
  const { size, textColor, buttonColor, variant, text, onClick } = props;

  const buttonStyle = {
    color: textColor || "white",
    backgroundColor: buttonColor || "#007bff",
    borderColor: buttonColor || "transparent",
    width: size || "120px",
    height: "40px",
    transition: "opacity 0.4s ease", // Adicionando transição de opacidade
  };

  return (
    <>
      <Button
        variant={variant || "primary"}
        style={buttonStyle}
        onClick={onClick || (() => {})}
        onMouseOver={(e) => (e.target.style.opacity = 0.8)} 
        onMouseOut={(e) => (e.target.style.opacity = 1)} 
      >
        {text}
      </Button>
    </>
  );
}