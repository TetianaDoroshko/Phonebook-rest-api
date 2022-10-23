const { Contact } = require("../../models/contacts");
const RequestError = require("../../helpers/RequestError");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);
  if (!contact) {
    throw RequestError(404, "Not found");
  } else {
    res.json({ message: "contact deleted" });
  }
};

module.exports = deleteContact;
