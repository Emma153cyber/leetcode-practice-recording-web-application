const usersData = {};

function getUserData(username) {
  return usersData[username];
}

function addUserData(username, userData) {
  usersData[username] = userData;
}

function isValidUsername(username) {
  const isValid = /^[A-Za-z0-9_]+$/.test(username); // Filter in-valid username
  return isValid;
}

module.exports = {
  getUserData,
  addUserData,
  isValidUsername,
};
