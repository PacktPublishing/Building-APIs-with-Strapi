const Strapi = require('@strapi/strapi');

let instance;

const setupStrapi = async () => {
  if (!instance) {
    instance = await Strapi().load();
    instance.server.mount();
  }
  return instance;
};

module.exports = { setupStrapi };
