const qs = require('qs');

// name contains classroom_3 AND number of max students is greater than 25 OR less than 10
const query = qs.stringify(
  {
    filters: {
      $or: [
        {
          maxStudents: {
            $lt: 10,
          },
        },
        {
          maxStudents: {
            $gt: 25,
          },
        },
      ],
      name: {
        $contains: 'classroom_3',
      },
    },
  },
  {
    encodeValuesOnly: true, // prettify url
  }
);

console.log(query);

console.log(`\nhttp://localhost:1337/api/classrooms?${query}\n`);
