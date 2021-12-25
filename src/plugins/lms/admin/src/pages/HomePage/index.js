/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import pluginId from '../../pluginId';
import pluginPkg from '../../../../package.json';

const HomePage = () => {
  return (
    <div>
      <h1>{pluginPkg.strapi.name}</h1>
      <h2>{pluginPkg.strapi.description}</h2>
      <Link to={`/plugins/${pluginId}/enrollments`}>Show all Enrollments</Link>
    </div>
  );
};

export default memo(HomePage);
