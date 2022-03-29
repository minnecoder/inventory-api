import DB from "../config/postgres-db";
import { CreateOrderProductDTO } from "../dtos/orderProduct.dto";
import { OrderProduct } from "../interfaces/orderProduct.interface";
import { Product } from "../interfaces/product.interface";
import { Order } from "../interfaces/order.interface";
import { NotFound } from "../errors/NotFound";
import { AlreadyExists } from "../errors/AlreadyExists";

class OrderProductService {
    public OrderProduct = DB.OrderProduct
    public Order = DB.Order
    public Product = DB.Product

    public async findAllOrderProducts(): Promise<OrderProduct[]> {
        const allOrderProducts: OrderProduct[] = await this.OrderProduct.findAll()
        return allOrderProducts
    }

    public async findOrderProductById(OrderProductId: number): Promise<OrderProduct> {
        const singleOrderProduct: OrderProduct = await this.OrderProduct.findByPk(OrderProductId)

        if (!singleOrderProduct) throw new NotFound('OrderProduct')

        return singleOrderProduct
    }

    public async createOrderProduct(OrderProductData: CreateOrderProductDTO): Promise<OrderProduct> {
        // Check if orderId is valid
        const findOrder: Order = await this.Order.findOne({ where: { id: OrderProductData.orderId } })
        if (!findOrder) throw new NotFound('Order')

        // Check if productId is valid
        const findProduct: Product = await this.Product.findOne({ where: { id: OrderProductData.productId } })
        if (!findProduct) throw new NotFound('Product')

        const createdOrderProductData: OrderProduct = await this.OrderProduct.create({ ...OrderProductData })

        return createdOrderProductData
    }

    public async updateOrderProduct(OrderProductId: number, OrderProductData: CreateOrderProductDTO): Promise<OrderProduct> {
        const findOrderProduct: OrderProduct = await this.OrderProduct.findOne({ where: { id: OrderProductData.id } })

        if (!findOrderProduct) throw new NotFound('OrderProduct')

        // Check if orderId is valid
        const findOrder: Order = await this.Order.findOne({ where: { id: OrderProductData.orderId } })
        if (!findOrder) throw new NotFound('Order')

        // Check if productId is valid
        const findProduct: Product = await this.Product.findOne({ where: { id: OrderProductData.productId } })
        if (!findProduct) throw new NotFound('Product')

        await this.OrderProduct.update({ ...OrderProductData }, { where: { id: OrderProductId } })

        const updatedOrderProduct = await this.OrderProduct.findByPk(OrderProductId)

        return updatedOrderProduct
    }

    public async deleteOrderProduct(OrderProductId: number): Promise<OrderProduct> {
        const findOrderProduct: OrderProduct = await this.OrderProduct.findByPk(OrderProductId)

        await this.OrderProduct.destroy({ where: { id: OrderProductId } })

        return findOrderProduct
    }
}

export default OrderProductService