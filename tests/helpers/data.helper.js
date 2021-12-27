const createTestClasses = async (numberOfClasses = 10) => {
  try {
    const classroomsPromise = [];

    const min = 1;
    const max = 30;

    Array(numberOfClasses)
      .fill(null)

      .forEach((_item, index) => {
        const name = `classroom_${index + 1}`;

        // Get random numnber in range of min and max
        const maxStudents = Math.random() * (max - min + 1) + min;

        classroomsPromise.push(
          strapi.service('api::classroom.classroom').create({
            data: {
              name,
              description: `Description of the classroom ${name}`,
              maxStudents: Math.floor(maxStudents),
            },
          })
        );
      });
    await Promise.all(classroomsPromise);
  } catch (e) {
    throw new Error('Failed to create mock data');
  }
};

const createUser = async (type = 'admin', username = 'testuser') => {
  try {
    // Get the role from the database
    const role = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({
        where: { type },
      });

    // Create the user
    return await strapi.db.query('plugin::users-permissions.user').create({
      data: {
        username,
        email: `${username}@strapi.com`,
        password: 'password',
        provider: 'local',
        confirmed: true,
        role: role ? role.id : null,
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error('Failed to create mock user');
  }
};

module.exports = {
  createTestClasses,
  createUser,
};
