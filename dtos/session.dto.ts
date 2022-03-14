import { IsBoolean, IsInt, IsString } from "class-validator";

export class CreateSessionDTO {
    public id: number

    @IsString()
    public sessionToken: string

    @IsInt()
    public userId: number

    @IsBoolean()
    public valid: boolean

    @IsString()
    public userAgent: string

    @IsString()
    public ip: string
}