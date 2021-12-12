const ProductReview = require("../models/ProductReview")
const Product = require('../models/Product')
const User = require('../models/User')

// @desc Get all Product Reviews
// @route GET /productreviews
// @access User
exports.getProductReviews = async (req, res) => {
    try {
        const reviews = await ProductReview.findAll({
            include: [Product, User]
        })
        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "Server Error"
        })
    }
}

// @desc Add Product Review
// @route POST /productreviews
// @access Admin
exports.addProductReview = async (req, res) => {
    try {
        const review = await ProductReview.create(req.body)

        return res.status(200).json({
            success: true,
            data: review
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Server Error" })
    }
}

// @desc Get Single Product Review
// @route GET /productreviews/:id
// @access User
exports.getSingleProductReview = async (req, res) => {
    try {
        const review = await ProductReview.findOne({
            where: {
                id: req.params.id
            },
            include: [Product, User]
        })

        if (!review) {
            return res.status(404).json({
                success: false,
                error: "Review not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: review
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Server Error" })
    }
}

// @desc Update Product Review
// @route PUT /productreviews/:id
// @access Admin
exports.updateProductReview = async (req, res) => {
    try {
        await ProductReview.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        return res.status(200).json({
            success: true,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Server Error" })
    }
}
// @desc Delete Product Review
// @route DELETE /productreviews/:id
// @access Admin
exports.deleteProductReview = async (req, res) => {
    try {
        await ProductReview.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json({
            success: true
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "Server Error"
        })
    }
}