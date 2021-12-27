const fs = require('fs');
const os = require('os');

const { setupStrapi } = require('./helpers/strapi');

const cleanup = async () => {
  await setupStrapi();
  const dbSettings = strapi.config.get('database.connection.connection');

  //close server to release the db-file
  await strapi.destroy();

  // Check if we are on windows
  const isWindows = os.platform() === 'win32';

  //delete test database after all tests
  if (!isWindows && dbSettings && dbSettings.filename) {
    if (fs.existsSync(dbSettings.filename)) {
      fs.unlinkSync(dbSettings.filename);
    }
  }
};

module.exports = cleanup;
