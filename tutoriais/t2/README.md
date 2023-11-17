# Passo a passo de como foi feito esse tutorial
Este é um componente React que implementa um formulário de login simples usando o framework Bootstrap para o estilo.
O formulário inclui campos para o primeiro nome, sobrenome, nome de usuário, e-mail e senha.
## Instruções de Uso
1. Primeiro foi necessário navegar até o diretório de instalação do projeto do tutorial 2 através do comando:
   ```
    cd tutoriais\t2
   ```
2. Posteriormente, foi usado o comando para criar a aplicação React do frontend:
   ```
    npx create-react-app frontend
   ```
3. O framework Bootstrap tbm foi usado, utilize esse comando para efetuar a instalação:
   ```
    npm install react-bootstrap bootstrap
   ```
4. Para inicializar a aplicação foi utilizado o comando:
   ```
    cd frontend
    npm start
   ```
Para acessar a aplicação no navegador, foi usado o URL http://localhost:3000
Para verificar se tudo estava funcionando corretamente, a aplicação local foi aberta no navegador e o 
arquivo tutoriais\tutorial-3\frontend\src\App.js foi modificado para que seja possível o efeito dessas modificações no navegador.

5. Altere o codigo dentro de \App.js, cole esse codigo:
  ```
    import React from "react";
    import FormularioT2 from "./FormularioT2";
    
    function App() {
      return (
        <div>
          <FormularioT2 />
        </div>
      );
    }
    
    export default App;
  ```
6. Crie uma pasta chamada \componets, e crie uma arquivo chamado \FormularioT2.jsx, e cole esse codigo:
   ```
    import { useState } from "react";
    import Button from "react-bootstrap/Button";
    import Col from "react-bootstrap/Col";
    import Form from "react-bootstrap/Form";
    import InputGroup from "react-bootstrap/InputGroup";
    import Row from "react-bootstrap/Row";
    import "bootstrap/dist/css/bootstrap.min.css";
    
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
   ```
7. Foi usado o Bootstrap para facilitar na construção da tela, as caixas de formularios são componentes
prontos para uso dentro do framework, que fornece varios exemplos de como construir telas com certa facilidade
usando apenas componentes já prontos. É possivel saber mais acessando: [React Bootstrap](https://react-bootstrap.netlify.app).

## Screenshot da aplicação
![image](https://github.com/es20232/eqp2/assets/40923082/179d3585-0778-4913-b483-9a308661312f)
