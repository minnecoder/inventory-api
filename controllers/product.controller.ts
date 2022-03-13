import { NextFunction, Request, Response } from "express";
import { CreateProductDTO } from "../dtos/product.dto";
import { Product } from "../interfaces/product.interface";
import ProductService from "../services/product.service";

class ProductController {
    public ProductService = new ProductService()

    public getProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllProductsData: Product[] = await this.ProductService.findAllProducts()

            return res.status(200).json({
                data: findAllProductsData
            })
        } catch (error) {
            next(error)
        }
    }

    public getSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ProductId = Number(req.params.id)
            const findSingleProductData = await this.ProductService.findProductById(ProductId)

            return res.status(200).json({
                data: findSingleProductData
            })
        } catch (error) {
            next(error)
        }
    }

    public addProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ProductData: CreateProductDTO = req.body
            const createProductData: Product = await this.ProductService.createProduct(ProductData)

            return res.status(200).json({
                data: createProductData
            })
        } catch (error) {
            next(error)
        }
    }

    public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ProductId = Number(req.params.id)
            const ProductData: CreateProductDTO = req.body
            const updateProduct: Product = await this.ProductService.updateProduct(ProductId, ProductData)

            return res.status(200).json({
                data: updateProduct
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ProductId = Number(req.params.id)
            const deleteProductData = await this.ProductService.deleteProduct(ProductId)

            return res.status(200).json({
                data: deleteProductData
            })
        } catch (error) {
            next(error)
        }
    }
}

export default ProductController