const { Router } = require('express');
const { listContacts, getContactById, addContact, removeContact, patchContact } = require('./contacts');
const { validate } = require('./helpers/validate');
const { createContactSchema, updateContactSchema } = require('./helpers/schemes');


const router = Router();

router.get('/', listContacts)
router.get('/:contactId', getContactById)
router.post('/', validate(createContactSchema), addContact)
router.delete('/:contactId', removeContact)
router.patch('/:contactId', validate(updateContactSchema), patchContact)

exports.apiRouter = router;