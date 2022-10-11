const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contactList = await fs.readFile(contactsPath);
  return JSON.parse(contactList);
};

const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const contact = contactList.find(
    (contact) => String(contact.id) === contactId
  );
  return contact || null;
};

const removeContact = async (contactId) => {
  const contactList = await listContacts();
  const index = contactList.findIndex(
    (contact) => String(contact.id) === contactId
  );
  if (index === -1) {
    return null;
  }
  const deletedContact = contactList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return deletedContact;
};

const addContact = async (body) => {
  const newContact = { id: randomUUID(), ...body };
  const contactList = await listContacts();
  contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactList = await listContacts();
  const index = contactList.find((contact) => String(contact.id) === contactId);
  if (!index) {
    return null;
  }
  const { name, email, phone } = body;
  const updatedList = contactList.map((contact) => {
    if (String(contact.id) === contactId) {
      if (name) {
        contact.name = name;
      }
      if (email) {
        contact.email = email;
      }
      if (phone) {
        contact.phone = phone;
      }
    }
    return contact;
  });
  await fs.writeFile(contactsPath, JSON.stringify(updatedList, null, 2));
  const contact = updatedList.find((cont) => cont.id === contactId);

  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
