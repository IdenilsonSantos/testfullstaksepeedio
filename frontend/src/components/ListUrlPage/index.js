import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { getToken, isAuthenticated } from "../../services/auth";
import HeaderC from "../Header";

import { Wrapper, Container, TableContainer } from "./styles";

function ListUrlPage() {
  const [url, setUrl] = useState([]);
  const [urlOrigin, setUrlOrigin] = useState("");

  useEffect(() => {
    async function handleUrl() {
      const token = getToken();

      let headers = {};

      if (token) {
        headers = {
          authorization: token,
        };
      }

      const response = await api.get("url/view");

      setUrl(response.data);
    }

    handleUrl();
  }, []);

  const sendUrl = async (e, id) => {
    const response = await api.get(`${id}`);

    if (response.status === 200) {
      setUrlOrigin(response.data);
    }
  };

  return (
    <>
      <Wrapper>
        <Container>
          <HeaderC />
          <TableContainer>
            <thead>
              <tr>
                <th>Url Original</th>
                <th>Url Encurtada</th>
                <th>Titulo da Url</th>
              </tr>
            </thead>
            <tbody>
              {url.map((item) => (
                <>
                  <tr>
                    <td>{item.urlOrigin}</td>
                    <td>
                      {
                        <button
                          className="btnRedirect"
                          onClick={(e) => sendUrl(e, item.urlShortHash)}
                        >
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
