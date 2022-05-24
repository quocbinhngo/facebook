const usersModel = require("../models/usersModel");

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
}

function validateLength(text, minLength, maxLength) {
  return text.length >= minLength && text.length <= maxLength;
}

async function validateUniqueEmail(email) {
  return !(await usersModel.findOne({ email }));
}

async function validateUniqueUsername(username) {
  return !(await usersModel.findOne({ username }));
}

module.exports = {
  validateEmail,
  validateLength,
  validateUniqueUsername,
  validateUniqueEmail,
};
