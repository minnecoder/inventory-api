import { IsInt, IsString } from "class-validator";

export class CreateProductSupplierDTO {
    public id: number

    @IsInt()
    public productId: number

    @IsInt()
    public supplierId: number

    @IsString()
    public productSupplierNotes: string
}