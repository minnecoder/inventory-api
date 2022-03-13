import { Router } from "express";
import ProductController from "../controllers/product.controller";
import { CreateProductDTO } from "../dtos/product.dto";
import { Route } from "../interfaces/route.interface";
import validationMiddleware from "../middleware/validation.middleware";

class ProductRoute implements Route {
    public path = '/products'
    public router = Router()
    public ProductController = new ProductController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.ProductController.getProducts)
        this.router.get(`${this.path}/:id`, this.ProductController.getSingleProduct)
        this.router.post(`${this.path}`, validationMiddleware(CreateProductDTO), this.ProductController.addProduct)
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateProductDTO, true), this.ProductController.updateProduct)
        this.router.delete(`${this.path}/:id`, this.ProductController.deleteProduct)
    }
}

export default ProductRoute