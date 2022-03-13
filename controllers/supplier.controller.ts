import { NextFunction, Request, Response } from "express";
import { CreateSupplierDTO } from "../dtos/supplier.dto";
import { Supplier } from "../interfaces/supplier.interface";
import SupplierService from "../services/supplier.service";

class SupplierController {
    public SupplierService = new SupplierService()

    public getSuppliers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllSuppliersData: Supplier[] = await this.SupplierService.findAllSuppliers()

            return res.status(200).json({
                data: findAllSuppliersData
            })
        } catch (error) {
            next(error)
        }
    }

    public getSingleSupplier = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const SupplierId = Number(req.params.id)
            const findSingleSupplierData = await this.SupplierService.findSupplierById(SupplierId)

            return res.status(200).json({
                data: findSingleSupplierData
            })
        } catch (error) {
            next(error)
        }
    }

    public addSupplier = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const SupplierData: CreateSupplierDTO = req.body
            const createSupplierData: Supplier = await this.SupplierService.createSupplier(SupplierData)

            return res.status(200).json({
                data: createSupplierData
            })
        } catch (error) {
            next(error)
        }
    }

    public updateSupplier = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const SupplierId = Number(req.params.id)
            const SupplierData: CreateSupplierDTO = req.body
            const updateSupplier: Supplier = await this.SupplierService.updateSupplier(SupplierId, SupplierData)

            return res.status(200).json({
                data: updateSupplier
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteSupplier = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const SupplierId = Number(req.params.id)
            const deleteSupplierData = await this.SupplierService.deleteSupplier(SupplierId)

            return res.status(200).json({
                data: deleteSupplierData
            })
        } catch (error) {
            next(error)
        }
    }
}

export default SupplierController