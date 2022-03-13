import { IsInt, IsString } from "class-validator";

export class CreateProductSupplierDTO {
    @IsInt()
    public id: number

    @IsInt()
    public productId: number

    @IsInt()
    public supplierId: number

    @IsString()
    public productSupplierNotes: string
}