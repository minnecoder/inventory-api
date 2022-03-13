import { Router } from "express";
import ProductReviewController from "../controllers/productReview.controller";
import { CreateProductReviewDTO } from "../dtos/productReview.dto";
import { Route } from "../interfaces/route.interface";
import validationMiddleware from "../middleware/validation.middleware";

class ProductReviewRoute implements Route {
    public path = '/productreviews'
    public router = Router()
    public ProductReviewController = new ProductReviewController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.ProductReviewController.getProductReviews)
        this.router.get(`${this.path}/:id`, this.ProductReviewController.getSingleProductReview)
        this.router.post(`${this.path}`, validationMiddleware(CreateProductReviewDTO), this.ProductReviewController.addProductReview)
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateProductReviewDTO, true), this.ProductReviewController.updateProductReview)
        this.router.delete(`${this.path}/:id`, this.ProductReviewController.deleteProductReview)
    }
}

export default ProductReviewRoute