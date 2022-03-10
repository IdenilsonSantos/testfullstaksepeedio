import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { getToken, isAuthenticated, } from '../../services/auth';


import {
    Wrapper, Container, Header, TitleHeader,
    LogginButton, SignUpLogin, TableContainer
} from './styles';


function ListUrlPage() {

    const [url, setUrl] = useState([]);
    const [urlOrigin, setUrlOrigin] = useState('');

    useEffect(() => {
        async function handleUrl(){

            const token = getToken();
    
            let headers = {};
    
            if (token) {
                headers = {
                    'authorization': token,
                };
            }
    
                const response = await api.get('url/views/');

                setUrl(response.data)

        };
    
        handleUrl();
    },[]);


            const sendUrl = async (e) => {
                const response = await api.get(`t/${e}`);
                
                if(response.status === 200){
                    console.log(response.data)
                    setUrlOrigin(response.data)
                }

            }

            
            

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
                    <TableContainer>
                    <thead>
       <tr>
        <th>Url Original</th>
        <th>Url Encurtada</th>
        <th>Uitulo da Url</th>
       </tr>
      </thead>
      <tbody>
      {url.map((item) => (
          <>
          <tr>
      <td>{item.urlOrigin}</td>
      <td>
      {
      <button onClick={(e) => sendUrl(item.urlShortHash)}>
      <a href={item.urlOrigin}>{item.urlShort}</a>
      </button>
      }
      </td>
      <td>{item.urlTitle}</td>
     </tr> 
          </>
      ))}
      </tbody>
                    </TableContainer>
                </Container>
            </Wrapper>
            
        </>
    );
}

export default ListUrlPage;