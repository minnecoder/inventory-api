import { IsInt, IsString } from "class-validator";

export class CreateOrderProductDTO {
    @IsInt()
    public id: number

    @IsInt()
    public orderId: number

    @IsInt()
    public productId: number

    @IsInt()
    public quantityOrdered: number

    @IsString()
    public productStatus: string
}