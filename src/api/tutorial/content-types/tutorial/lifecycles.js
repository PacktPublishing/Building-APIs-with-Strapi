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
  async afterCreate(event) {
    try {
      const { result } = event;
      const classManager = result.classroom && result.classroom.manager;

      if (!classManager || !classManager.email) {
        strapi.log.info(
          'No manager set for this classroom, so not sending an email.'
        );
        return;
      }

      // Get the name of the user who created the tutorial to include in the email
      const { firstname } = result.createdBy;

      const subject = `A new tutorial was created by ${firstname}`;
      const text = `A new tutorial titled "${result.title}" was created by ${firstname}`;

      const email = {
        to: classManager.email,
        subject,
        text,
      };

      strapi.log.info(
        'An email will be sent with the following options:',
        email
      );

      await strapi.plugins['email'].services.email.send(email);
    } catch (err) {
      strapi.log.error('Failed to send an email on tutorial creation');

      strapi.log.error(err);
    }
  },
};
