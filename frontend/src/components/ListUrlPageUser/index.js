import React, { useEffect, useState } from "react";
import { FiHeart, FiTrash } from "react-icons/fi";
import api from "../../services/api";
import { getToken } from "../../services/auth";
import HeaderC from "../Header";

import { Wrapper, Container, ButtonFavorite, TableContainer } from "./styles";

function ListUrlPageUser() {
  const [url, setUrl] = useState([]);
  const [favorite, setFavorite] = useState([]);

  const token = getToken();

  let headers = {};

  if (token) {
    headers = {
      authorization: token,
    };
  }

  async function handleUrl() {
    const response = await api.get("url/user", { headers });
    setUrl(response.data);
  }

  useEffect(() => {
    handleUrl();
  }, [url]);

  const sendUrl = (id) => async () => {
    const response = await api.get(id, {
      headers,
    });

    await api.put(`${"/url/view/"}${id}`, { headers });

    return response.urlOrigin;
  };

  const handleFavorite = (id) => async (e) => {
    const favItem = favorite.findIndex((fav) => {
      return fav.urlShortHash === id;
    });

    if (favItem === -1) {
      const find = url.find((item) => {
        return item.urlShortHash === id;
      });

      const value = !find.urlFavorite ? true : false;
      await api.put(`${"/url/user/favorite/"}${id}`, { value }, { headers });
      favorite.push(find);
      setFavorite([...favorite]);
    } else {
      favorite.splice(favItem, 1);
      setFavorite([...favorite]);
    }
  };

  const handleDelete = (id) => async (e) => {
    await api.delete(`${"/url/del/"}${id}`, { headers });
    handleUrl();
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
                <th>Favoritar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {url.map((item) => (
                <tr key={item._id}>
                  <td>{item.urlOrigin}</td>
                  <td>
                    <button
                      className="btnRedirect"
                      onClick={sendUrl(item.urlShortHash)}
                    >
                      <a href={item.urlOrigin}>{item.urlShort}</a>
                    </button>
                  </td>
                  <td>{item.urlTitle}</td>
                  <td>
                    <ButtonFavorite onClick={handleFavorite(item.urlShortHash)}>
                      {!item.urlFavorite ? (
                        <FiHeart color="#000" />
                      ) : (
                        <FiHeart color="#c03" />
                      )}
                    </ButtonFavorite>
                  </td>
                  <td>
                    {" "}
                    <ButtonFavorite onClick={handleDelete(item.urlShortHash)}>
                      <FiTrash color="#000" />
                    </ButtonFavorite>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableContainer>
        </Container>
      </Wrapper>
    </>
  );
}

export default ListUrlPageUser;
