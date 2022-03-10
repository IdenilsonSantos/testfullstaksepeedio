import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { getToken, isAuthenticated, } from '../../services/auth';


import {
    Wrapper, Container, Header, TitleHeader,
    LogginButton, SignUpLogin, FormBox,
    InputUrl,
    ButtonSend
} from './styles';


function HomePage() {

    const [urlLong, setUrlLong] = useState({
        error: '',
        url: '',
        urlShort: '',
        urlTitle: '',
        messageStatus: ''
    });

    const handleUrl = async e => {
        e.preventDefault();

        const token = getToken();

        let headers = {};

        if (token) {
            headers = {
                'authorization': token,
            };
        }

        const data = { urlOrigin: urlLong.url, urlTitle: urlLong.urlTitle }

        if (urlLong.url === '' || urlLong.urlTitle === '') {
            setUrlLong({ ...urlLong, error: 'Preencha a url para continuar!' });

        } else {
            const response = await api.post('url', data, headers);

            console.log(response)

            const { urlShort } = response.data

            if (response.status === 201) {
                setUrlLong({ ...urlLong, messageStatus: "Url criada com sucesso", urlShort: urlShort  });
            }
            else {
                
            setUrlLong({ ...urlLong, messageStatus: "Url já criada" });
            }

        }
    };

    const { messageStatus } = urlLong;

    return (

        <>

            <Wrapper>
                <Container>
                    <Header>
                        <TitleHeader>Encurtador de Urls</TitleHeader>
                        {isAuthenticated ? <SignUpLogin>
                            <Link style={{textDecoration: "none"}} to='/logout'><LogginButton>Sair</LogginButton></Link>
                        </SignUpLogin> : <SignUpLogin>
                            <Link style={{textDecoration: "none"}} to='/login'><LogginButton>Login</LogginButton></Link>
                            <Link style={{textDecoration: "none"}} to='/register'><LogginButton>Cadastrar</LogginButton></Link>
                        </SignUpLogin>}
                    </Header>
                    <FormBox onSubmit={handleUrl}>
                        <InputUrl type="text"
                            name="url"
                            value={urlLong.url}
                            onChange={e => setUrlLong({ ...urlLong, url: e.target.value })} placeholder="Digite ou cole sua url"></InputUrl>
                        <InputUrl type="text"
                            name="urlTitle"
                            value={urlLong.urlTitle}
                            onChange={e => setUrlLong({ ...urlLong, urlTitle: e.target.value })} placeholder="Digite o titulo da url"></InputUrl>
                        <ButtonSend type="submit" >Enviar Url</ButtonSend>
                    </FormBox>
                    <h1>{messageStatus}</h1>
                </Container>
            </Wrapper>
        </>
    );
}

export default HomePage;