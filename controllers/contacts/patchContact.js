const { Contact } = require("../../models/contacts");
const RequestError = require("../../helpers/RequestError");

const patchContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!contact) {
    throw RequestError(404, "Not found");
  } else {
    res.json(contact);
  }
};

module.exports = patchContact;
