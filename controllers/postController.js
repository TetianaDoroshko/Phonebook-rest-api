const { addContact } = require("../models/contacts");

const postController = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = postController;