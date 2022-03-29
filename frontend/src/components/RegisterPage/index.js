import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import {
  Wrapper,
  Container,
  Header,
  TitleHeader,
  FormBox,
  InputLogin,
  ButtonSend,
} from "./styles";

function RegisterPage() {
  const [user, setUser] = useState({
    error: "",
    name: "",
    email: "",
    password: "",
    messageStatus: "",
  });

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { name, email, password } = user;

    if (user.name === "" || user.email === "" || user.password === "") {
      setUser({ ...user, error: "Preencha seus dados para continuar!" });
    } else {
      const response = await api.post("/register", { name, email, password });

      if (response.status === 200) {
        setUser({ ...user, messageStatus: "Registrado com sucesso" });
        navigate("/login");
      } else {
        setUser({ ...user, messageStatus: "Usuário não cadastrado" });
      }
    }
  };

  return (
    <>
      <Wrapper>
        <Container>
          <Header>
            <TitleHeader>Cadastrar</TitleHeader>
          </Header>
          <FormBox onSubmit={handleSignIn}>
            <InputLogin
              type="name"
              name="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Digite seu nome"
            ></InputLogin>

            <InputLogin
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Digite seu Email"
            ></InputLogin>
            <InputLogin
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Digite sua senha"
            ></InputLogin>
            <ButtonSend type="submit">Cadastrar</ButtonSend>
          </FormBox>
        </Container>
      </Wrapper>
    </>
  );
}

export default RegisterPage;
