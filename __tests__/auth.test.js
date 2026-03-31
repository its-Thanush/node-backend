const request = require('supertest');
const app = require('../app');


describe('POST /auth/register',()=>{

    it('creates a new user with valid data',async()=>{
        const res = await request (app)
        .post('/auth/register')
        .send({name:'Test User',email:'test@example.com',password:'password123'});

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email','test@example.com');
        expect(res.body).not.toHaveProperty('password');
    });

    it('return 400 with invalid email',async ()=>{
        const res =await request(app)
        .post('/auth/register')
        .send({name:'Test',email:'notanemail',password:'password123'});

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('issues');
    });

    it('returns 400 is password is too short',async()=>{
        const res = await request(app)
        .post('/auth/register')
        .send({name:"test",email:"test2@ghmail.com",password:"short"});

        expect(res.status).toBe(400);
    });
});


describe('POST /auth/login',()=>{

    it('return a token with correct crendentials',async()=>{
        const res = await request(app)
        .post('/auth/login')
        .send({ email: 'test@example.com', password: "password123" });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(typeof res.body.token).toBe('string');
    });


    it('return 401 with the wrong password',async()=>{
        const res =await request(app)
        .post('/auth/login')
        .send({email:"test@example.com",password:"wrong password"});

        expect(res.status).toBe(401);
    });

    it('returns 401 for non-existence user',async()=>{
        const res = await request(app)
        .post('/auth/login')
        .send({email:"nobody@gamil.com",password:"password123"});

        expect(res.status).toBe(401);
    });


})

afterAll(async () => {
  const prisma = require('../lib/prisma');
  await prisma.$disconnect();
}, 10000);