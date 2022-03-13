import { NextFunction, Request, Response } from "express";
import { CreateOrderDTO } from "../dtos/order.dto";
import { Order } from "../interfaces/order.interface";
import OrderService from "../services/order.service";

class OrderController {
    public OrderService = new OrderService()

    public getOrders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllOrdersData: Order[] = await this.OrderService.findAllOrders()

            return res.status(200).json({
                data: findAllOrdersData
            })
        } catch (error) {
            next(error)
        }
    }

    public getSingleOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const OrderId = Number(req.params.id)
            const findSingleOrderData = await this.OrderService.findOrderById(OrderId)

            return res.status(200).json({
                data: findSingleOrderData
            })
        } catch (error) {
            next(error)
        }
    }

    public addOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const OrderData: CreateOrderDTO = req.body
            const createOrderData: Order = await this.OrderService.createOrder(OrderData)

            return res.status(200).json({
                data: createOrderData
            })
        } catch (error) {
            next(error)
        }
    }

    public updateOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const OrderId = Number(req.params.id)
            const OrderData: CreateOrderDTO = req.body
            const updateOrder: Order = await this.OrderService.updateOrder(OrderId, OrderData)

            return res.status(200).json({
                data: updateOrder
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const OrderId = Number(req.params.id)
            const deleteOrderData = await this.OrderService.deleteOrder(OrderId)

            return res.status(200).json({
                data: deleteOrderData
            })
        } catch (error) {
            next(error)
        }
    }
}

export default OrderController