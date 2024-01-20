import { React, useState } from "react";
import { Form } from "react-bootstrap";

function InputFormComponent(props) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>{props.label || "Nome de usuário"}</Form.Label>
        <Form.Control
          type={props.type || "text"}
          placeholder={props.placeholder || "Digite seu nome de usuario..."}
          value={props.value || inputValue}
          onChange={props.onChange || handleChange}
          style={{
            backgroundColor: props.colorBackground || "#cccccc",
            color: "#13293d",
          }}
        />
      </Form.Group>
    </>
  );
}

export default InputFormComponent;