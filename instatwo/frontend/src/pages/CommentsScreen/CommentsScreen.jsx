import React, { useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import NavBarComponent from "../../components/NavBarComponent";
import ContainerComponent from "../../components/ContainerComponent";
import ProfileImage from "../../components/ProfileImage";
import ButtonComponent from "../../components/ButtonComponent";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { Image } from "react-bootstrap";
import InputFormComponent from "../../components/InputFormComponent";

export default function CommentsScreen() {

  return (
    <>
      <NavBarComponent />
      <Container className="d-flex flex-column align-items-center">
        <div style={{ marginTop: "5rem" }}></div>

        <ContainerComponent/>
        
      </Container>
    </>
  );
}
