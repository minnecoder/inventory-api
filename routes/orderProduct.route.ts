import { Router } from "express";
import OrderProductController from "../controllers/orderProduct.controller";
import { CreateOrderProductDTO } from "../dtos/orderProduct.dto";
import { Route } from "../interfaces/route.interface";
import validationMiddleware from "../middleware/validation.middleware";

class OrderProductRoute implements Route {
    public path = '/orderproducts'
    public router = Router()
    public OrderProductController = new OrderProductController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.OrderProductController.getOrderProducts)
        this.router.get(`${this.path}/:id`, this.OrderProductController.getSingleOrderProduct)
        this.router.post(`${this.path}`, validationMiddleware(CreateOrderProductDTO), this.OrderProductController.addOrderProduct)
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateOrderProductDTO, true), this.OrderProductController.updateOrderProduct)
        this.router.delete(`${this.path}/:id`, this.OrderProductController.deleteOrderProduct)
    }
}

export default OrderProductRoute