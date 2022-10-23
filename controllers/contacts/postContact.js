const { Contact } = require("../../models/contacts");

const postContact = async (req, res, next) => {
  const { _id } = req.user;
  const contact = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json(contact);
};

module.exports = postContact;
