import { IsDecimal, IsInt, IsNumber, IsString } from "class-validator";

export class CreateProductDTO {


    @IsString()
    public productName: string

    @IsString()
    public productDesc: string

    @IsDecimal()
    public productCost: number

    @IsDecimal()
    public productPrice: number

    @IsInt()
    public onHand: number

    @IsInt()
    public reorderLevel: number

    @IsInt()
    public reorderQty: number
}