'use strict';

/**
 * Create role if it does not exist in the system
 * @param {*} name The role name
 * @param {*} type The role type
 * @param {*} description The role description
 */
const createRoleIfNotExist = async (name, type, description = '') => {
  try {
    const role = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({
        where: { type },
      });

    if (!role) {
      await strapi.db.query('plugin::users-permissions.role').create({
        data: {
          name,
          type,
          description,
        },
      });
      strapi.log.info(`Created role ${name}`);
    }
  } catch (e) {
    strapi.log.error(e);
  }
};

/** 

* Enable action on a controller for a specific role 
* @param {*} type The role type 
* @param {*} apiName The name of the API where the controller action lives 
* @param {*} controller The controller where the action lives 
* @param {*} action The action itself 
*/
const enablePermission = async (type, apiName, controller, action) => {
  try {
    // Get the role entity
    const role = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({
        where: { type },
        populate: ['permissions'],
      });

    const actionId = `api::${apiName}.${controller}.${action}`;

    // Get the permissions associated with the role
    const rolePermission = role.permissions.find(
      permission => permission.action === actionId
    );

    if (!rolePermission) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: {
          action: actionId,
          role: role.id,
        },
      });
    }
  } catch (e) {
    strapi.log.error(
      `Bootstrap script: Could not update settings. ${controller} -   ${action}`
    );
  }
};

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap(/*{ strapi }*/) {
    // Creating roles
    await createRoleIfNotExist('Student', 'student', 'Student role');
    await createRoleIfNotExist('Teacher', 'teacher', 'Teacher role');
    await createRoleIfNotExist('Admin', 'admin', 'App admin role');

    // Admin Role Classroom permissions
    await enablePermission('admin', 'classroom', 'classroom', 'create');
    await enablePermission('admin', 'classroom', 'classroom', 'find');
    await enablePermission('admin', 'classroom', 'classroom', 'findOne');
    await enablePermission('admin', 'classroom', 'classroom', 'findTutorials');
    await enablePermission('admin', 'classroom', 'classroom', 'create');
    await enablePermission('admin', 'classroom', 'classroom', 'update');
    await enablePermission('admin', 'classroom', 'classroom', 'delete');

    await enablePermission('public', 'classroom', 'classroom', 'find');
  },
};
