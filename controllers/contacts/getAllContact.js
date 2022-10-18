const { Contact } = require("../../models/contacts");

const getAllContact = async (req, res, next) => {
  try {
    const contactsList = await Contact.find();
    res.json(contactsList);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContact;
