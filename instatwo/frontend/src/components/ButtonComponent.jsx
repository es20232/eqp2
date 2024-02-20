import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ButtonComponent(props) {
  const { size, textColor, buttonColor, variant, text, onClick, onChange, isRound, sizeRound, to, type } = props;

  const buttonStyle = {
    color: textColor || "white",
    backgroundColor: buttonColor || "#267094",
    borderColor: buttonColor || "transparent",
    width: size || "120px",
    height: isRound ? size || "40px" : "40px", // Ajuste para tornar o botão redondo
    borderRadius: sizeRound ? sizeRound : "0", // Ajuste para tornar o botão redondo
    fontWeight: "bold",
    transition: "opacity 0.4s ease", // Adicionando transição de opacidade
  };

  return (
    <>
    <Link to={to}>
      <Button
        variant={variant || "primary"}
        style={buttonStyle}
        onClick={onClick || (() => {})}
        onMouseOver={(e) => (e.target.style.opacity = 0.8)} 
        onMouseOut={(e) => (e.target.style.opacity = 1)} 
        onChange={onChange || (() => {})}
        type={type? type : "button"}
      >
        {text ? text : <input type="file" id="image" name="image"/>}
      </Button>
    </Link>
    </>
  );
}
