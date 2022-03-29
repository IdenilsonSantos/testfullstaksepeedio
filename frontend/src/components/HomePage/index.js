import React, { useState } from "react";
import api from "../../services/api";
import { getToken } from "../../services/auth";
import validateUrl from "../../utils/validateUrl";
import HeaderC from "../Header";

import {
  Wrapper,
  Container,
  FormBox,
  InputUrl,
  ButtonSend,
  CardUrl,
} from "./styles";

function HomePage() {
  const [dataUrl, setDataUrl] = useState({
    error: "",
    url: "",
    urlShort: "",
    urlShortHash: "",
    urlTitle: "",
    messageStatus: "",
  });

  const token = getToken();

  let headers = {};

  if (token) {
    headers = {
      authorization: token,
    };
  }

  const handleUrl = async (e) => {
    e.preventDefault();

    const token = getToken();

    let headers = {};

    if (token) {
      headers = {
        authorization: token,
      };
    }

    let valid = validateUrl(dataUrl.url);

    if (!valid) {
      setDataUrl({
        ...dataUrl,
        error: "Preencha a url corretamente para continuar!",
      });
    } else {
      const response = await api.post(
        "url",
        {
          urlOrigin: `${"https://"}${dataUrl.url}`,
          urlTitle: dataUrl.urlTitle,
          error: "",
        },
        { headers }
      );


      if (response.status === 201) {
        const { urlShort, urlShortHash, urlOrigin } = response.data.data;

        setDataUrl({
          ...dataUrl,
          url: urlOrigin,
          messageStatus: "Url criada com sucesso",
          urlShort,
          urlShortHash,
        });
      } else {
        setDataUrl({ ...dataUrl, messageStatus: "Url já criada" });
      }
    }
  };

  const sendUrl = (id) => async () => {
    const response = await api.get(id, {
      headers,
    });

    await api.put(`${"/url/view/"}${id}`, { headers });

    return response.urlOrigin;
  };



  const { messageStatus, urlShort, urlShortHash, error, url } = dataUrl;

  return (
    <Wrapper>
      <Container>
        <HeaderC />
        <FormBox onSubmit={handleUrl}>
          <InputUrl
            type="text"
            name="url"
            value={dataUrl.url}
            onChange={(e) => setDataUrl({ ...dataUrl, url: e.target.value })}
            placeholder="Digite ou cole sua url"
          ></InputUrl>
          <InputUrl
            type="text"
            name="urlTitle"
            value={dataUrl.urlTitle}
            onChange={(e) =>
              setDataUrl({ ...dataUrl, urlTitle: e.target.value })
            }
            placeholder="Digite o titulo da url"
          ></InputUrl>
          <ButtonSend type="submit">Enviar Url</ButtonSend>
        </FormBox>
        <CardUrl>
          {messageStatus  && urlShort ? (
            <span>
              {messageStatus}{':  '}
              <button className="btnRedirect" onClick={sendUrl(urlShortHash)}>
                <a href={url}>{urlShort}</a>
              </button>
            </span>
          ) : (
            ""
          )}
          {error ? <span>{error}</span> : ""}
        </CardUrl>
      </Container>
    </Wrapper>
  );
}
export default HomePage;
