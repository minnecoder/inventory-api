import { NextFunction, Request, Response } from "express";
import { CreateOrderProductDTO } from "../dtos/orderProduct.dto";
import { OrderProduct } from "../interfaces/orderProduct.interface";
import orderProductsService from "../services/orderProduct.service";

class orderProductsController {
    public orderProductsService = new orderProductsService()

    public getOrderProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllorderProductsData: OrderProduct[] = await this.orderProductsService.findAllOrderProducts()

            return res.status(200).json({
                data: findAllorderProductsData
            })
        } catch (error) {
            next(error)
        }
    }

    public getSingleOrderProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderProductsId = Number(req.params.id)
            const findSingleorderProductsData = await this.orderProductsService.findOrderProductById(orderProductsId)

            return res.status(200).json({
                data: findSingleorderProductsData
            })
        } catch (error) {
            next(error)
        }
    }

    public addOrderProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderProductsData: CreateOrderProductDTO = req.body
            const createorderProductsData: OrderProduct = await this.orderProductsService.createOrderProduct(orderProductsData)

            return res.status(200).json({
                data: createorderProductsData
            })
        } catch (error) {
            next(error)
        }
    }

    public updateOrderProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderProductsId = Number(req.params.id)
            const orderProductsData: CreateOrderProductDTO = req.body
            const updateorderProducts: OrderProduct = await this.orderProductsService.updateOrderProduct(orderProductsId, orderProductsData)

            return res.status(200).json({
                data: updateorderProducts
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteOrderProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orderProductsId = Number(req.params.id)
            const deleteorderProductsData = await this.orderProductsService.deleteOrderProduct(orderProductsId)

            return res.status(200).json({
                data: deleteorderProductsData
            })
        } catch (error) {
            next(error)
        }
    }
}

export default orderProductsController