const { Contact } = require("../models/contacts");

const getAllController = async (req, res, next) => {
  try {
    const contactsList = await Contact.find();
    res.json(contactsList);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllController;
