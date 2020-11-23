const { ContactModel } = require('./contacts.model')
const mongoosePaginate = require('mongoose-paginate-v2');

listContacts = async (req, res, next) => {
  if(Object.keys(req.query).length>=1){
    next()
  }
  const contacts = await ContactModel.find();
  return res.status(200).send(contacts)
}

getContactById = async (req, res, next) => {
  const contact = await ContactModel.findById(req.params.contactId);
  if (!contact) {
    return res.status(404).json({ "message": "Contact not found" });
  }
  return res.status(200).send(contact);
}

removeContact = async (req, res, next) => {
  const contact = await ContactModel.findByIdAndDelete(req.params.contactId);
  if (!contact) {
    return res.status(404).json({ "message": "Contact not found" });
  }
  return res.status(204).send();
}

addContact = async (req, res, next) => {
  const contact = await ContactModel.create(req.body);
  return res.status(200).send(contact);
}

patchContact = async (req, res, next) => {
  const contact = await ContactModel.findByIdAndUpdate(req.params.contactId, req.body, {new:true})
  if(!contact){
    res.status(404).json({"message": "Contact not found"})
  }
  res.status(200).send(contact);
}

queryContacts = async (req, res, next) => {
  if(req.query.page && req.query.limit){
    const options = {
      page: req.query.page,
      limit: req.query.limit,
    };
    ContactModel.paginate({}, options, function(err, result) {
      res.status(200).send(result)
    })
  }else if( req.query.sub){
    const filtredItems = await ContactModel.find({"subscription": req.query.sub});
    res.send(filtredItems)
  }
  return res.status(400)
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  patchContact,
  queryContacts
}