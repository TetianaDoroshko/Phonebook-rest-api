const { Contact } = require("../../models/contacts");
const RequestError = require("../../helpers/RequestError");

const getByIdContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findOne({ _id: contactId });
  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.json(contact);
};

module.exports = getByIdContact;
