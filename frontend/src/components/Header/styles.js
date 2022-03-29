import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #c03;
`;

const Container = styled.div`
  width: 100%;
  padding-right: 0px;
  padding-left: 10px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  width: 100%;
  height: 50px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavHeader = styled.div`
  height: 50px;
  display: flex;

  a {
    margin-left: 10px;
    margin-top: 20px;
    color: #fff;
  }
`;

const TitleHeader = styled.h1`
  color: #fff;
  font-size: 30px;

  span {
    font-size: 14px;
    margin-left: 10px;
    font-weight: 400;
  }
`;

const LogginButton = styled.button`
  height: 40px;
  cursor: pointer;
  margin-right: 20px;
  margin-top: 15px;
  background: none;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: #fff;

  &:hover {
    color: #eeee;
  }
`;

const SignUpLogin = styled.div`
  width: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const FormBox = styled.form`
  width: 400px;
  height: 250px;
  background: #fff;
  margin-top: 50px;
  padding: 20px;
  border-radius: 4px;
`;

const InputUrl = styled.input`
  width: 100%;
  height: 40px;
  padding-left: 7px;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ButtonSend = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 30px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background: #93092c;
  color: #fff;

  &:hover {
    opacity: 90%;
    transition: 0.2s ease-in-out;
  }
`;

const CardUrl = styled.div`
  width: 400px;
  height: 50px;
  font-size: 20px;
  background: #fff;
  margin-top: 20px;
  padding: 0px 10px;
  border-radius: 4px;
  span {
    font-size: 14px;
  }
`;

export {
  Wrapper,
  Container,
  Header,
  NavHeader,
  TitleHeader,
  LogginButton,
  SignUpLogin,
  FormBox,
  InputUrl,
  ButtonSend,
  CardUrl,
};
