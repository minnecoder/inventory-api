import { IsInt, IsString } from "class-validator";

export class CreateProductReviewDTO {
    public id: number

    @IsInt()
    public productId: number

    @IsInt()
    public userId: number

    @IsInt()
    public rating: number

    @IsString()
    public reviewText: string
}