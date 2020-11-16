const { ContactModel } = require('./model.js')

listContacts = async (req, res, next) => {
  try{
    const contacts = await ContactModel.find();
    return res.status(200).send(contacts)
  }catch(err){
    next(err)
  }
}

getContactById = async (req, res, next) => {
  try{
    const contact = await ContactModel.findById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ "message": "Contact not found" });
    }
    return res.status(200).send(contact);
  }catch(err){
    next(err)
  }
}

removeContact = async (req, res, next) => {
  try{
    const contact = await ContactModel.findByIdAndDelete(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ "message": "Contact not found" });
    }
    return res.status(204).send();
  }catch(err){
    next(err);
  }
}

addContact = async (req, res, next) => {
  try{
    const contact = await ContactModel.create(req.body);
    return res.status(200).send(contact);
  }catch(err){
    next(err)
  }
}

patchContact = async (req, res, next) => {
  try{
    const contact = await ContactModel.findByIdAndUpdate(req.params.contactId, req.body, {new:true})
    if(!contact){
      res.status(404).json({"message": "Contact not found"})
    }
    res.status(200).send(contact);
  }catch(err){
    next(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  patchContact
}