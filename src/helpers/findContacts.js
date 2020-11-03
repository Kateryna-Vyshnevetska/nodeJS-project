exports.findById = (contacts, id) => {
  return contacts.find(contact => contact.id === id);
}

exports.findIndexById = (contacts, id) => {
  const idx = contacts.findIndex(contact => contact.id === id)
  if (idx === -1) {
    return;
  }
  return idx;
}