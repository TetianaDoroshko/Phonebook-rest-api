const { listContacts } = require("../models/contacts");

const getAllController = async (req, res, next) => {
  try {
    const contactsList = await listContacts();
    res.json(contactsList);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllController;
