const { Contact } = require("../models/contacts");
const RequestError = require("../helpers/RequestError");

const deleteController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndDelete(contactId);
    if (!contact) {
      throw RequestError(404, "Not found");
    } else {
      res.json({ message: "contact deleted" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = deleteController;
