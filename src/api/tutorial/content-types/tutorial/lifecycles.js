module.exports = {
  beforeCreate(event) {
    const {
      params: { data },
    } = event;

    data.summary = strapi
      .service('api::tutorial.tutorial')
      .generateSummary(data);
  },
  beforeUpdate(event) {
    const {
      params: { data },
    } = event;

    data.summary = strapi
      .service('api::tutorial.tutorial')
      .generateSummary(data);
  },
};
