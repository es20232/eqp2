import React from "react";
import { Container, Alert } from "react-bootstrap";

export default function AlertNoLogin() {
    return (
        <Container
        fluid
        className="d-flex align-items-center justify-content-center vh-90"
      >
        <Alert variant="info">
          <Alert.Heading>Ops!</Alert.Heading>
          <p>
            Você precisa entrar no sistema para visualizar estas informações.
          </p>
          <hr />
          <p className="mb-0">
            Clique <a href="auth/login">aqui</a> para fazer login.
          </p>
        </Alert>
      </Container>
    )
};