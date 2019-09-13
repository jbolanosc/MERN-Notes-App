const { Router } = require('express');

const { getNotes, createNotes, getNote, updateNotes, deleteNotes } = require('../controllers/note.controller');

const router = Router();

router.route('/')
    .get(getNotes)
    .post(createNotes);

router.route('/:id')
    .get(getNote)
    .put(updateNotes)
    .delete(deleteNotes);





module.exports = router;