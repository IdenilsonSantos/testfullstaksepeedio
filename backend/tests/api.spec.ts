import { app } from "../src/app";
import request from "supertest";
import { randFirstName, randEmail, randPassword, randUrl, randDomainName } from '@ngneat/falso';

let token = '';
let urlId = '';

console.log(urlId)

describe("Authenticate", () => {
    it('should be register a new user', async () => {

        const response = await request(app)
        .post(`/register`)
        .send({
            name: randFirstName(),
            email: randEmail(),
            password: randPassword()
        });

        expect(response.status).toBe(200);

    });

    it('should return jwt token when authenticated', async () => {

        const response = await request(app)
            .post('/login')
            .send({
                email: 'mei-luo436@juno.com',
                password:'VTBMs5Xo6ppK55d'
            });

        token = response.body.token;
        
        expect(response.body).toHaveProperty('token');

    });
});

describe("Url Short", () => {
    it('should be short url by user is authenticated ', async () => {

        const response = await request(app)
        .post(`/url`)
        .send({
            urlOrigin: randUrl(),
            urlTitle: randDomainName(),
        }).set("authorization", token);

        urlId = response.body.hash;

        expect(response.status).toBe(201);

    });

    it('should be short url by user is not authenticated ', async () => {

        const response = await request(app)
        .post(`/url`)
        .send({
            urlOrigin: randUrl(),
            urlTitle: randDomainName(),
        });

        expect(response.status).toBe(201);

    });

    it('should be get url by user authenticated ', async () => {

        const response = await request(app)
        .get(`/url`)
        .set("authorization", token);

        expect(response.status).toBe(200);

    });

    it('not should be get url by user authenticated ', async () => {

        const response = await request(app)
        .get(`/url`);

        expect(response.status).toBe(400);

    });

    it('should be increment url on views ', async () => {

        const response = await request(app)
        .post(`${'/url/view/'}${urlId}`);

        expect(response.status).toBe(200);

    });

    it('should be return top url views ', async () => {

        const response = await request(app)
        .get('/url/views');

        expect(response.status).toBe(200);

    });

    it('should be delete url by user authenticated ', async () => {

        const response = await request(app)
        .delete(`${'/url/del/'}${urlId}`)
        .set("authorization", token);

        expect(response.status).toBe(204);

    });
});



