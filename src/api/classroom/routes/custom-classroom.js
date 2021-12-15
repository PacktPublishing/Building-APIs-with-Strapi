module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/classrooms/:id/tutorials',
      handler: 'classroom.findTutorials',
      config: {
        auth: false,
      },
    },
    // {
    //   method: 'POST',
    //   path: '/classrooms/seed',
    //   handler: 'classroom.seed',
    //   config: {
    //     auth: false,
    //   },
    // },
  ],
};
