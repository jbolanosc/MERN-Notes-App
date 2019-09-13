const { Router } = require('express');

const { getUser, getUsers, createUser, updateUser, deleteUser } = require('../controllers/user.controller');


const router = Router();

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);





module.exports = router;