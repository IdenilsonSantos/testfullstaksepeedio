import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { login } from '../../services/auth';


import {
    Wrapper, Container, Header, TitleHeader, FormBox,
    InputLogin,
    ButtonSend
} from './styles';


function LoginPage() {

    const [user, setUser] = useState({
        error: '',
        email: '',
        password: '',
        messageStatus: ''
    });

    const navigate = useNavigate();

    const handleSignIn = async e => {
        e.preventDefault();

        const { email, password } = user

        if (user.email === '' || user.password === '') {
            setUser({ ...user, error: 'Preencha seus dados para continuar!' });

        } else {
            const response = await api.post('/login', {email, password});

            if (response.status === 200) {
                setUser({ ...user, messageStatus: "Logado com sucesso" });
                login(response.data.token);
                navigate('/');
            }
            else{
                setUser({ ...user, messageStatus: "Usuário não logado" });
            }

            
        }
    };

    return (

        <>
            <Wrapper>
                <Container>
                    <Header>
                        <TitleHeader>Login</TitleHeader>
                    </Header>
                    <FormBox onSubmit={handleSignIn}>
                        <InputLogin type="email"
                            name="email"
                            value={user.email}
                            onChange={e => setUser({ ...user, email: e.target.value })} placeholder="Digite seu Email"></InputLogin>
                        <InputLogin type="password"
                            name="password"
                            value={user.password}
                            onChange={e => setUser({ ...user, password: e.target.value })} placeholder="Digite sua senha"></InputLogin>
                        <ButtonSend type="submit" >Logar</ButtonSend>
                    </FormBox>
                </Container>
            </Wrapper>
        </>
    );
}

export default LoginPage;