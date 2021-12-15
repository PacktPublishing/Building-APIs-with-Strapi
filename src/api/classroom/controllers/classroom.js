'use strict';

/**
 *  classroom controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { sanitize } = require('@strapi/utils');

module.exports = createCoreController(
  'api::classroom.classroom',
  ({ strapi }) => ({
    async find(ctx) {
      // Calling the default core action
      const { data, meta } = await super.find(ctx);
      meta.totalTutorials = data.length + 100;

      return { data, meta };
    },
    async findTutorials(ctx) {
      const { params } = ctx;
      const results = await strapi
        .service('api::classroom.classroom')
        .findTutorials(params.id);

      const model = strapi.getModel('api::tutorial.tutorial');
      const sanitizedResult = await sanitize.contentAPI.output(results, model);

      return this.transformResponse(sanitizedResult);
    },
    // async seed(ctx) {
    //   try {
    //     const classroomsPromise = [];

    //     // Min and Max values to generate random number in range
    //     const min = 1;
    //     const max = 30;

    //     // Number of classrooms to be created
    //     const numberOfClasses = 50;

    //     Array(numberOfClasses)
    //       .fill(null)

    //       .forEach((_item, index) => {
    //         const name = `classroom_${index + 1}`;

    //         // Get random numnber in range of min and max
    //         const maxStudents = Math.random() * (max - min + 1) + min;

    //         classroomsPromise.push(
    //           strapi.service('api::classroom.classroom').create({
    //             data: {
    //               name,
    //               description: `Description of the classroom ${name}`,
    //               maxStudents: Math.floor(maxStudents),
    //             },
    //           })
    //         );
    //       });

    //     await Promise.all(classroomsPromise);

    //     return { message: 'Ok' };
    //   } catch (e) {
    //     strapi.log.error('Failed to seed the database');
    //     console.error(e);
    //   }
    // },
  })
);
