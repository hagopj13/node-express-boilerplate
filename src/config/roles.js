const roles = ['user', 'staff', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['user']);
roleRights.set(roles[1], ['staff']);
roleRights.set(roles[2], ['user', 'staff', 'admin']);

module.exports = {
  roles,
  roleRights
};
