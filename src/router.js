const { Router } = require('express');
const { listContacts, getContactById, addContact, removeContact, patchContact } = require('./controller');
const { validate } = require('./helpers/validate');
const { createContactSchema, updateContactSchema, validateIdSchema  } = require('./helpers/schemes');


const router = Router();

router.get('/', listContacts)
router.get('/:contactId', validate(validateIdSchema, "params"), getContactById)
router.post('/', validate(createContactSchema), addContact)
router.delete('/:contactId', validate(validateIdSchema, "params"), removeContact)
router.patch('/:contactId', validate(validateIdSchema, "params"), validate(updateContactSchema), patchContact)

exports.apiRouter = router;