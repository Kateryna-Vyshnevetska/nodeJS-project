const { Router } = require('express');
const { listContacts, getContactById, addContact, removeContact, patchContact, queryContacts } = require('./contacts.controller');
const { validate } = require('../helpers/validate');
const { createContactSchema, updateContactSchema, validateIdSchema, FiltredContacts  } = require('../helpers/schemes');
const { asyncWrapper } = require('../helpers/async-wrapper');


const router = Router();

router.get('/', asyncWrapper(listContacts))
router.get('/', validate(FiltredContacts, "query"), asyncWrapper(queryContacts))
router.get('/:contactId', validate(validateIdSchema, "params"), asyncWrapper(getContactById))
router.post('/', validate(createContactSchema), addContact)
router.delete('/:contactId', validate(validateIdSchema, "params"), asyncWrapper(removeContact))
router.patch('/:contactId', validate(validateIdSchema, "params"), validate(updateContactSchema), asyncWrapper(patchContact))


exports.apiRouter = router;