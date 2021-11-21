const express = require("express")

const {
    registerUser,
    loginUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser
} = require("../controllers/user")

const router = express.Router()

router.route('/').get(getUsers).post(registerUser)
router.route('/login').post(loginUser)
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser)

module.exports = router