import DB from "../config/postgres-db";
import { CreateOrderDTO } from "../dtos/order.dto";
import { Order } from "../interfaces/order.interface";
import { NotFound } from "../errors/NotFound";
import { AlreadyExists } from "../errors/AlreadyExists";

class OrderService {
    public Order = DB.Order

    public async findAllOrders(): Promise<Order[]> {
        const allOrders: Order[] = await this.Order.findAll()
        return allOrders
    }

    public async findOrderById(OrderId: number): Promise<Order> {
        const singleOrder: Order = await this.Order.findByPk(OrderId)

        if (!singleOrder) throw new NotFound('Order')

        return singleOrder
    }

    public async createOrder(OrderData: CreateOrderDTO): Promise<Order> {
        const findOrder: Order = await this.Order.findOne({ where: { id: OrderData.id } })

        if (findOrder) throw new AlreadyExists('Order')

        const createdOrderData: Order = await this.Order.create({ ...OrderData })

        return createdOrderData
    }

    public async updateOrder(OrderId: number, OrderData: CreateOrderDTO): Promise<Order> {
        const findOrder: Order = await this.Order.findOne({ where: { id: OrderData.id } })

        if (!findOrder) throw new NotFound('Order')

        await this.Order.update({ ...OrderData }, { where: { id: OrderId } })

        const updatedOrder = await this.Order.findByPk(OrderId)

        return updatedOrder
    }

    public async deleteOrder(OrderId: number): Promise<Order> {
        const findOrder: Order = await this.Order.findByPk(OrderId)

        await this.Order.destroy({ where: { id: OrderId } })

        return findOrder
    }
}

export default OrderService