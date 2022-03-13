import { Router } from "express";
import CustomerController from "../controllers/customer.controller";
import { CreateCustomerDTO } from "../dtos/customer.dto";
import { Route } from "../interfaces/route.interface";
import validationMiddleware from "../middleware/validation.middleware";

class CustomerRoute implements Route {
    public path = '/customers'
    public router = Router()
    public CustomerController = new CustomerController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.CustomerController.getCustomers)
        this.router.get(`${this.path}/:id`, this.CustomerController.getSingleCustomer)
        this.router.post(`${this.path}`, validationMiddleware(CreateCustomerDTO), this.CustomerController.addCustomer)
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateCustomerDTO, true), this.CustomerController.updateCustomer)
        this.router.delete(`${this.path}/:id`, this.CustomerController.deleteCustomer)
    }
}

export default CustomerRoute