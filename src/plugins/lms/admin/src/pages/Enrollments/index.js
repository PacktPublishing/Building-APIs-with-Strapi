import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@strapi/design-system/Box';
import { Divider } from '@strapi/design-system/Divider';
import { Typography } from '@strapi/design-system/Typography';
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table';

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
    <Box padding={10}>
      <Typography variant="alpha">List of classes with enrollments</Typography>
      <Divider />

      {classes.map(item => {
        const { id, attributes } = item;
        const students = attributes.students.data;

        return (
          <Box padding={5} key={id}>
            <Typography variant="beta">{attributes.name}</Typography>
            <h2></h2>
            <Typography>{attributes.description}</Typography>
            <Box paddingTop={5}>
              <Table>
                <Thead>
                  <Tr>
                    <Th>
                      <Typography>#</Typography>
                    </Th>
                    <Th>
                      <Typography>Name</Typography>
                    </Th>
                    <Th>
                      <Typography>Email</Typography>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {students.map((student, i) => {
                    return (
                      <Tr key={student.id}>
                        <Td>
                          <Typography>{i + 1}</Typography>
                        </Td>
                        <Td>
                          <Typography>{student.attributes.username}</Typography>
                        </Td>
                        <Td>
                          <Typography>{student.attributes.email}</Typography>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
            <Divider />
          </Box>
        );
      })}
    </Box>
  );
};

export default memo(Enrollments);
