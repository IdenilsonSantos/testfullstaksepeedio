import React, { useState } from "react";
import { Link } from "react-router-dom";

import { getToken, isAuthenticated, logout } from "../../services/auth";

import {
  Header,
  NavHeader,
  TitleHeader,
  LogginButton,
  SignUpLogin,
} from "./styles";

function HeaderC() {
  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
    window.location.replace("/");
  };

  return (
    <Header>
      <TitleHeader>
        Encurtador de Urls
        <span>
          {isAuthenticated && getToken()
            ? "Usuário Autenticado"
            : "Usuário Anonimo"}
        </span>
      </TitleHeader>
      <NavHeader>
      <Link to="/">Home</Link>
        {isAuthenticated && getToken() ? (
            <Link to="/url/views/user">Listar Top Urls</Link>
        ) : (
          <Link to="/url/views">Listar Top Urls</Link>
        )}
      </NavHeader>
      {isAuthenticated && getToken() ? (
        <SignUpLogin>
          <LogginButton onClick={handleLogout}>Sair</LogginButton>
        </SignUpLogin>
      ) : (
        <SignUpLogin>
          <Link style={{ textDecoration: "none" }} to="/login">
            <LogginButton>Login</LogginButton>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/register">
            <LogginButton>Cadastrar</LogginButton>
          </Link>
        </SignUpLogin>
      )}
    </Header>
  );
}
export default HeaderC;
