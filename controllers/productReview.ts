import { Request, Response } from "express"
import ProductReview from "../models/ProductReview"
import Product from "../models/Product"
import User from "../models/User"

// @desc Get all Product Reviews
// @route GET /productreviews
// @access User
export let getProductReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await ProductReview.findAll({
            include: [Product, User]
        })
        return res.status(200).json({
            count: reviews.length,
            data: reviews
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }
}

// @desc Add Product Review
// @route POST /productreviews
// @access Admin
export let addProductReview = async (req: Request, res: Response) => {
    try {
        const review = await ProductReview.create(req.body)

        return res.status(200).json({
            data: review
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }
}

// @route GET /productreviews/:id
// @access User
export let getSingleProductReview = async (req: Request, res: Response) => {
    try {
        const review = await ProductReview.findOne({
            where: {
                id: req.params.id
            },
            include: [Product, User]
        })

        if (!review) {
            return res.status(404).send("Review not found")
        }

        return res.status(200).json({
            data: review
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }
}

// @desc Update Product Review
// @route PUT /productreviews/:id
// @access Admin
export let updateProductReview = async (req: Request, res: Response) => {
    try {
        await ProductReview.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        return res.sendStatus(200)
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }
}

// @desc Delete Product Review
// @route DELETE /productreviews/:id
// @access Admin
export let deleteProductReview = async (req: Request, res: Response) => {
    try {
        await ProductReview.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.sendStatus(200)
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }
}