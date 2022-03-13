import { NextFunction, Request, Response } from "express";
import { CreateProductReviewDTO } from "../dtos/productReview.dto";
import { ProductReview } from "../interfaces/productReview.interface";
import ProductReviewService from "../services/productReview.service";

class ProductReviewController {
    public ProductReviewService = new ProductReviewService()

    public getProductReviews = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllProductReviewsData: ProductReview[] = await this.ProductReviewService.findAllProductReviews()

            return res.status(200).json({
                data: findAllProductReviewsData
            })
        } catch (error) {
            next(error)
        }
    }

    public getSingleProductReview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ProductReviewId = Number(req.params.id)
            const findSingleProductReviewData = await this.ProductReviewService.findProductReviewById(ProductReviewId)

            return res.status(200).json({
                data: findSingleProductReviewData
            })
        } catch (error) {
            next(error)
        }
    }

    public addProductReview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ProductReviewData: CreateProductReviewDTO = req.body
            const createProductReviewData: ProductReview = await this.ProductReviewService.createProductReview(ProductReviewData)

            return res.status(200).json({
                data: createProductReviewData
            })
        } catch (error) {
            next(error)
        }
    }

    public updateProductReview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ProductReviewId = Number(req.params.id)
            const ProductReviewData: CreateProductReviewDTO = req.body
            const updateProductReview: ProductReview = await this.ProductReviewService.updateProductReview(ProductReviewId, ProductReviewData)

            return res.status(200).json({
                data: updateProductReview
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteProductReview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ProductReviewId = Number(req.params.id)
            const deleteProductReviewData = await this.ProductReviewService.deleteProductReview(ProductReviewId)

            return res.status(200).json({
                data: deleteProductReviewData
            })
        } catch (error) {
            next(error)
        }
    }
}

export default ProductReviewController