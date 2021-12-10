const express = require("express")

const {
    registerUser,
    registerAdminUser,
    loginUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    logoutUser
} = require("../controllers/user")

const router = express.Router()

router.route('/').get(getUsers).post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser)
router.route('/addadmin').post(registerAdminUser)

module.exports = router