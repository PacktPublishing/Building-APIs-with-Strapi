/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table';

import { Link } from 'react-router-dom';
import pluginId from '../../pluginId';
import pluginPkg from '../../../../package.json';

const HomePage = () => {
  return (
    <Box padding={10}>
      <Box paddingTop={2}>
        <Typography variant="alpha">{pluginPkg.strapi.name}</Typography>
      </Box>
      <Box paddingTop={2}>
        <Typography>{pluginPkg.strapi.description}</Typography>
      </Box>
      <Box paddingTop={2}>
        <Link to={`/plugins/${pluginId}/enrollments`}>
          Show all Enrollments
        </Link>
      </Box>
    </Box>
  );
};

export default memo(HomePage);
