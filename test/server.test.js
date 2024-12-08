const tap = require('tap');
const supertest = require('supertest');
const app = require('../app');
const server = supertest(app);
const bcrypt = require('bcrypt');
const user = require("../Models/User");
const {validateRegistration} = require('../Middlewares/Validate');


let mockUser;

let token = '';


tap.before(async () => {

    mockUser = {
        name: 'Johnson Fernandis',
        email: 'john@superman.com',
        password: 'password123'
    };
    await user.deleteOne({ email: mockUser.email });

    const hashedPassword = await bcrypt.hash(mockUser.password, 10);

    await user.create({
        name: mockUser.name,
        email: mockUser.email,
        password: hashedPassword 
    });
});

tap.after(async () => {
    await user.deleteOne({ email: mockUser.email });
});


// Auth tests

let uniqueEmail = `user${Date.now()}@example.com`;

tap.test('POST /register', async (t) => { 
 
    const response = await server.post('/api/v1/users/register').send(
        {
            name: 'New User',
            email: uniqueEmail,
            password: 'password123',
        }
    );
    t.equal(response.status, 201, 'Response status should be 201 for successful registration');
    t.hasOwnProp(response.body, 'message', 'Response should include "message"');
    t.hasOwnProp(response.body, 'userId', 'Response should include "userId"');
    t.end();
});




tap.test('POST /register with missing email',validateRegistration, async (t) => {
   
    mockUser = {
        name: "carls jame",
        password: "password241"
    }

    const response = await server.post('/api/v1/users/register').send({
        name: mockUser.name,
        password: mockUser.password
    });
    t.equal(response.status, 400);
    t.same(response.body.message, '"email" is required');
    t.end();
});

tap.test('POST /register with email Already exists in Database',async (t)=>{


    const response = await server.post('/api/v1/users/register').send({
        name: mockUser.name,
        email: uniqueEmail,
        password: mockUser.password
    });
    t.equal(response.status, 400);
    t.same(response.body.message,'Email already exists');
    t.end();
});



tap.test('POST /login', async (t) => { 
     
    mockUser={
        email: 'john@superman.com',
        password: 'password123'
    }

    const response = await server.post('/api/v1/users/login').send({
        email: mockUser.email,
        password: mockUser.password
    });
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'token');
    token = response.body.token;
    t.end();
});

tap.test('POST /login with wrong password', async (t) => {
    const response = await server.post('/api/v1/users/login').send({
        email: 'john@superman.com',
        password: 'wrongpassword'
    });
    t.equal(response.status, 401);
    t.end();
});

// Preferences tests
let preferences ={
    categories: "general",
    languages: "ar",
    country: "us"
};

tap.test('PUT /preferences', async (t) => {
    const response = await server.put('/api/user/preferences')
    .set('Authorization',`${token}`)
    .send({
        preferences: preferences
    });
    t.equal(response.status, 201, 'Status should be 201 for successful update');
    t.ok(response.body.message, 'Preferences updated successfully');
    t.end();
});

tap.test('GET /preferences', async (t) => {
    const response = await server.get('/api/user/preferences').set('Authorization', `${token}`);
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'user');
    t.same(response.body.user.preferences, {
        "categories": preferences.categories,
        "languages": preferences.languages,
        "country": preferences.country
    });
    t.end();
});

tap.test('GET /preferences without token', async (t) => {
    const response = await server.get('/api/users/preferences').set('Authorization', ``);
    t.equal(response.status, 404);
    t.end();
});




// News tests
tap.test('GET /news with token', async (t) => {
    const response = await server.get('/api/v1/news').set('Authorization', `${token}`);
    if(preferences.languages === 'en'){
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'articles');
    }
    t.end();
});

tap.test('GET /news with invalid token', async (t) => {
    const response = await server.get('/api/v1/news').set('Authorization',`InvalidToken`);
    t.equal(response.status, 401);
    t.end();
});

tap.test('GET /news when News API returns  empty data', async (t) => {
    const response = await server.get('/api/v1/news').set('Authorization', `${token}`);
    t.equal(response.status, 200, 'Response status should be 200');
    t.same(response.body, [], 'Response body should match the expected JSON structure')
    t.end();
});

tap.test('GET /news without token', async (t) => {
    const response = await server.get('/api/v1/news').set('Authorization', ``);
    t.equal(response.status, 400);
    t.end();
});



tap.teardown(async () => {
    process.exit(0);
});