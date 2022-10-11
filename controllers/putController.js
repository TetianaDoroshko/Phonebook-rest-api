const { updateContact } = require("../models/contacts");
const RequestError = require("../helpers/RequestError");

const putController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const contact = await updateContact(contactId, body);
    if (!contact) {
      throw RequestError(404, "Not found");
    } else {
      res.json(contact);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = putController;
