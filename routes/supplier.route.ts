import { Router } from "express";
import SupplierController from "../controllers/supplier.controller";
import { CreateSupplierDTO } from "../dtos/supplier.dto";
import { Route } from "../interfaces/route.interface";
import validationMiddleware from "../middleware/validation.middleware";

class SupplierRoute implements Route {
    public path = '/suppliers'
    public router = Router()
    public SupplierController = new SupplierController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.SupplierController.getSuppliers)
        this.router.get(`${this.path}/:id`, this.SupplierController.getSingleSupplier)
        this.router.post(`${this.path}`, validationMiddleware(CreateSupplierDTO), this.SupplierController.addSupplier)
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateSupplierDTO, true), this.SupplierController.updateSupplier)
        this.router.delete(`${this.path}/:id`, this.SupplierController.deleteSupplier)
    }
}

export default SupplierRoute