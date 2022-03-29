import { IsEmail, IsInt, IsPhoneNumber, IsString } from "class-validator";

export class CreateCustomerDTO {
    public id: number

    @IsString()
    public customerName: string

    @IsString()
    public customerAddress: string

    @IsString()
    public customerCity: string

    @IsString()
    public customerState: string

    @IsString()
    public customerZip: string

    @IsString()
    public customerPhone: string

    @IsEmail()
    public customerEmail: string
}