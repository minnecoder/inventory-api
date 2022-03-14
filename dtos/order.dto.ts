import { IsDecimal, IsInt, IsString } from "class-validator";

export class CreateOrderDTO {
    public id: number

    @IsInt()
    public customerId: number

    @IsString()
    public orderStatus: string

    @IsDecimal()
    public orderTotal: number
}