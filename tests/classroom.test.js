const request = require('supertest');
const { setupStrapi } = require('./helpers/strapi');
const { createTestClasses, createUser } = require('./helpers/data.helper');

const numberOfClasses = 5;

describe('classroom controller test', () => {
  beforeAll(async () => {
    await setupStrapi();
    await createTestClasses(numberOfClasses);
  });

  afterAll(() => {
    strapi.server.destroy();
  });

  it('should return list of classroom', async () => {
    await request(strapi.server.httpServer)
      .get('/api/classrooms')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const { body } = response;
        expect(body).toBeDefined();
        expect(body).toHaveProperty('data');
        const { data } = body;
        expect(data.length).toBe(numberOfClasses);
        expect(data[0].attributes.name).toBe('classroom_1');
      });
  });

  it('should create new classroom', async () => {
    const testUser = await createUser();
    const jwt = await strapi.plugins['users-permissions'].services.jwt.issue({
      id: testUser.id,
    });

    // classroom we will create
    const classroom = {
      name: 'Test classroom',
      description: 'Class room for unit tests',
      maxStudents: 10,
    };

    const payload = {
      data: {
        ...classroom,
      },
    };

    await request(strapi.server.httpServer)
      .post('/api/classrooms')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${jwt}`)
      .send(payload)
      .expect(200)
      .then(response => {
        const { body } = response;
        expect(body).toBeDefined();
        expect(body).toHaveProperty('data');
        const { data } = body;
        expect(data.id).toBeDefined();
        expect(data.attributes.name).toBe(classroom.name);
        expect(data.attributes.description).toBe(classroom.description);
        expect(data.attributes.maxStudents).toBe(classroom.maxStudents);
      });
  });
});
