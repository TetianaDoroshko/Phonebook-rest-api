const { Contact } = require("../../models/contacts");

const getAllContact = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite = null } = req.query;

  const filterOpts = {
    owner: _id,
    // favorite: favorite ? true : { $in: [true, false] },
  };
  if (favorite) {
    filterOpts.favorite = true;
  }
  const contactsList = await Contact.find(filterOpts, "", {
    skip: (page - 1) * limit,
    limit: +limit,
  });
  res.json(contactsList);
};

module.exports = getAllContact;
