import { Router } from "express";
import ProductSupplierController from "../controllers/productSupplier.controller";
import { CreateProductSupplierDTO } from "../dtos/productSupplier.dto";
import { Route } from "../interfaces/route.interface";
import validationMiddleware from "../middleware/validation.middleware";

class ProductSupplierRoute implements Route {
    public path = '/productsuppliers'
    public router = Router()
    public ProductSupplierController = new ProductSupplierController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.ProductSupplierController.getProductSuppliers)
        this.router.get(`${this.path}/:id`, this.ProductSupplierController.getSingleProductSupplier)
        this.router.post(`${this.path}`, validationMiddleware(CreateProductSupplierDTO), this.ProductSupplierController.addProductSupplier)
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateProductSupplierDTO, true), this.ProductSupplierController.updateProductSupplier)
        this.router.delete(`${this.path}/:id`, this.ProductSupplierController.deleteProductSupplier)
    }
}

export default ProductSupplierRoute