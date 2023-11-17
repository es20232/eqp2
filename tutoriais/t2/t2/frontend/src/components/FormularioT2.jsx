import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
// import . from "FormularioT2.css";

export default function FormularioT2() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div>
        <h1 className="d-flex justify-content-center mb-3">Pagina de Login</h1>
        <div className="border border-dark">
          <Form
            noValidate
            validated={validated}
            className="p-3"
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Primeiro Nome</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Primeiro name"
                  defaultValue="José"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Sobrenome</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Sobrenome"
                  defaultValue="Fernando"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Usuario</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Usuario"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" placeholder="E-mail" required />
                <Form.Control.Feedback type="invalid">
                  Entre com um email valido.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Senha" required />
                <Form.Control.Feedback type="invalid">
                  Digite uma senha valida.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="d-flex justify-content-end p-2" >
              <Button as={Col} md="2" variant="success" type="submit">Entrar</Button>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}
