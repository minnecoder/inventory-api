import { Router } from "express";
import OrderController from "../controllers/order.controller";
import { CreateOrderDTO } from "../dtos/order.dto";
import { Route } from "../interfaces/route.interface";
import validationMiddleware from "../middleware/validation.middleware";

class OrderRoute implements Route {
    public path = '/orders'
    public router = Router()
    public OrderController = new OrderController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.OrderController.getOrders)
        this.router.get(`${this.path}/:id`, this.OrderController.getSingleOrder)
        this.router.post(`${this.path}`, validationMiddleware(CreateOrderDTO), this.OrderController.addOrder)
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateOrderDTO, true), this.OrderController.updateOrder)
        this.router.delete(`${this.path}/:id`, this.OrderController.deleteOrder)
    }
}

export default OrderRoute