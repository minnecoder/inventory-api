import { NextFunction, Request, Response } from "express";
import { CreateProductSupplierDTO } from "../dtos/productSupplier.dto";
import { ProductSupplier } from "../interfaces/productSupplier.interface";
import ProductSupplierService from "../services/productSupplier.service";

class ProductSupplierController {
    public ProductSupplierService = new ProductSupplierService()

    public getProductSuppliers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllProductSuppliersData: ProductSupplier[] = await this.ProductSupplierService.findAllProductSuppliers()

            return res.status(200).json({
                data: findAllProductSuppliersData
            })
        } catch (error) {
            next(error)
        }
    }

    public getSingleProductSupplier = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ProductSupplierId = Number(req.params.id)
            const findSingleProductSupplierData = await this.ProductSupplierService.findProductSupplierById(ProductSupplierId)

            return res.status(200).json({
                data: findSingleProductSupplierData
            })
        } catch (error) {
            next(error)
        }
    }

    public addProductSupplier = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ProductSupplierData: CreateProductSupplierDTO = req.body
            const createProductSupplierData: ProductSupplier = await this.ProductSupplierService.createProductSupplier(ProductSupplierData)

            return res.status(200).json({
                data: createProductSupplierData
            })
        } catch (error) {
            next(error)
        }
    }

    public updateProductSupplier = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ProductSupplierId = Number(req.params.id)
            const ProductSupplierData: CreateProductSupplierDTO = req.body
            const updateProductSupplier: ProductSupplier = await this.ProductSupplierService.updateProductSupplier(ProductSupplierId, ProductSupplierData)

            return res.status(200).json({
                data: updateProductSupplier
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteProductSupplier = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ProductSupplierId = Number(req.params.id)
            const deleteProductSupplierData = await this.ProductSupplierService.deleteProductSupplier(ProductSupplierId)

            return res.status(200).json({
                data: deleteProductSupplierData
            })
        } catch (error) {
            next(error)
        }
    }
}

export default ProductSupplierController