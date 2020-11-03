const { json } = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const { findById, findIndexById } = require('./helpers/findContacts');
const contactsPath = path.join(__dirname, '../db/contacts.json');

listContacts = async (req, res, next) => {
    fs.readFile(contactsPath, 'utf8', (err, data) => {
      if (err) throw err;
    const contacts = JSON.parse(data);
    return res.status(200).json(contacts);
  });
}

getContactById = async (req, res, next) => {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) throw err;
    const { contactId } = req.params;
    const contacts = JSON.parse(data);
    const soughtContact = findById(contacts, JSON.parse(contactId));
    if (!soughtContact) {
      return res.status(404).json({ "message": "Not found" });
    }
    return res.status(200).json(soughtContact);
  })
}

removeContact = async (req, res, next) => {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const { contactId } = req.params;
    const idx = findIndexById(contacts, JSON.parse(contactId));
    if (!idx) {
      return res.status(404).json({ "message": "Not found" });
    }
    contacts.splice(idx, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8', err => {
      if (err) throw err;
    })
    return res.status(200).json({ "message": "contact deleted" });
  })
}

addContact = async (req, res, next) => {
  const newContact = {
    id: uuid.v4(),
    ...req.body,
  }
  fs.readFile(contactsPath, 'utf8', (err,data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8', err => {
      if (err) throw err;
    })
    return res.status(201).send(newContact)
  });
}

patchContact = async (req, res, next) => {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const { contactId } = req.params;
    const idx = findIndexById(contacts, JSON.parse(contactId));
    if (!idx) {
      return res.status(404).json({"message": "Not found"});
    }
    contacts[idx] = { 
      ...contacts[idx],
      ...req.body,
    }
    fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8', err => {
      if (err) throw err;
    })
    return res.status(200).json(contacts[idx]);
  })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  patchContact
}