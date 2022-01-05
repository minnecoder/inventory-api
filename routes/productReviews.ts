import express from 'express'

import {
    getProductReviews,
    addProductReview,
    getSingleProductReview,
    updateProductReview,
    deleteProductReview
} from "../controllers/productReview"

const router = express.Router()

router.route('/')
    .get(getProductReviews)
    .post(addProductReview)

router.route('/:id')
    .get(getSingleProductReview)
    .put(updateProductReview)
    .delete(deleteProductReview)

module.exports = router