const express = require("express")
const {
    getProductReviews,
    addProductReview,
    getSingleProductReview,
    updateProductReview,
    deleteProductReview
} = require("../controllers/productReview")

const router = express.Router()

router.route('/')
    .get(getProductReviews)
    .post(addProductReview)

router.route('/:id')
    .get(getSingleProductReview)
    .put(updateProductReview)
    .delete(deleteProductReview)

module.exports = router