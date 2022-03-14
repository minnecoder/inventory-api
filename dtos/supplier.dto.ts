import { IsEmail, IsInt, IsPhoneNumber, IsString } from "class-validator";

export class CreateSupplierDTO {
    public id: number

    @IsString()
    public supplierName: string

    @IsString()
    public supplierAddress: string

    @IsString()
    public supplierCity: string

    @IsString()
    public supplierState: string

    @IsString()
    public supplierZip: string

    @IsString()
    public supplierPhone: string

    @IsEmail()
    public supplierEmail: string
}