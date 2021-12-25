import React, { memo, useEffect, useState } from 'react';

import axios from 'axios';

const Enrollments = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const axiosConfig = {
          headers: { authorization: `Bearer ${ENV.API_TOKEN}` },
        };
        const {
          data: { data },
        } = await axios.get(
          `${strapi.backendURL}/api/classrooms?populate=*`,
          axiosConfig
        );
        setClasses(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetch();
  }, []);

  return (
    <div>
      <h1>List of classes with enrollments</h1>
      {classes.map(item => {
        const { id, attributes } = item;
        const students = attributes.students.data;

        return (
          <React.Fragment key={id}>
            <div>
              <h2>{attributes.name}</h2>
              <p>{attributes.description}</p>
              <br />
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>name</th>
                    <th>email</th>
                  </tr>
                </thead>

                {students.map((student, i) => {
                  return (
                    <tr key={student.id}>
                      <td>{i + 1}</td>
                      <td>{student.attributes.username}</td>
                      <td>{student.attributes.email}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
            <hr />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default memo(Enrollments);
