const fs = require('fs');
const path = require('path');
const shortid = require('shortid');
const contactsPath = path.join(__dirname, 'db/contacts.json');
function listContacts() {
    fs.readFile(contactsPath, 'utf8', (err,data) => {
    if (err) {
      throw err
    }
    console.table(data);
  });
}
function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      throw err
    }
    const contacts = JSON.parse(data)
    console.log(contacts.find(contact => contact.id === contactId));
  })
  
}
function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      throw err
    }
    const contacts = JSON.parse(data)
    const newContacts = contacts.filter(contact => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContacts), 'utf8', err => {
      if (err) throw err
    })
    console.log('The contact has been deleted!');
  })
  
}
function addContact(name, email, phone) {
  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone
  }
  fs.readFile(contactsPath, 'utf8', (err,data) => {
    if (err) {
      throw err
    }
    const contacts = JSON.parse(data);
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8', err => {
      if (err) throw err
    })
    console.log('The file has been saved!');
  });
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}