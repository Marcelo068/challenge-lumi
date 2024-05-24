// import request from 'supertest';
// import express, { Application } from 'express';
// import usersRouter from './UserController';

// const app: Application = express();
// app.use(express.json());
// app.use('/users', usersRouter);

// describe('Testando rotas de usuários', () => {
//   it('Deve retornar uma lista de usuários ao chamar GET /users', async () => {
//     const response = await request(app).get('/users');
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(expect.any(Array));
//   });

//   it('Deve criar um novo usuário ao chamar POST /users', async () => {
//     const newUser = { firstName: 'John', lastName: 'Doe', age: 30 };
//     const response = await request(app)
//       .post('/users')
//       .send(newUser);
//     expect(response.status).toBe(200);
//     expect(response.body).toMatchObject(newUser);
//   });
// });
