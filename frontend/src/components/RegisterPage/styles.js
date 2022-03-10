import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    background: #c03
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
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TitleHeader = styled.h1`
    color: #fff;
    font-size: 30px;
    font-style: 
`;
const FormBox = styled.form`
    width: 400px;
    height: 250px;
    background: #fff;
    margin-top: 50px;
    padding: 20px;
    border-radius: 4px
`;

const InputLogin = styled.input`
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
    color: #FFF;

    &:hover {
        opacity: 90%;
        transition: 0.2s ease-in-out;
    }
`;



export { Wrapper, Container, Header, TitleHeader, 
 FormBox, InputLogin, ButtonSend };