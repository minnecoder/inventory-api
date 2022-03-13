import { IsBoolean, IsEmail, IsInt, IsString } from "class-validator";

export class CreateUserDTO {
    @IsInt()
    public id: number

    @IsString()
    public firstName: string

    @IsString()
    public lastName: string

    @IsEmail()
    public email: string

    @IsBoolean()
    public verified: boolean

    @IsString()
    public password: string

    @IsString()
    public role: string
}