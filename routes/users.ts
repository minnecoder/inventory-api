import express from "express"

import {
    registerUser,
    registerAdminUser,
    loginUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    logoutUser,
    changePassword,
    validateEmail
} from "../controllers/user"
import { createVerifyEmailLink } from "../email/verifyEmail"

const router = express.Router()

router.route('/').get(getUsers).post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser)
router.route('/addadmin').post(registerAdminUser)
router.route('/password').post(changePassword)
router.route('/validateemail').post(validateEmail)
router.route('/resendverifyemail').post(createVerifyEmailLink)

module.exports = router