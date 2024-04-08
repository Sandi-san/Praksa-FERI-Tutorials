import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator'
import { Match } from 'decorators/match.decorator'

//Swagger - da se ti dto pokaze na swagger api strani
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  first_name?: string

  @ApiProperty({ required: false })
  @IsOptional()
  last_name?: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Matches(/^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&+=`|{}:;!.?"()[\]-]{6,}/, {
    message:
      'Password must contain one number, one uppercase or lowercase letter and has to be longer than 5 characters!',
  })
  password: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  //custom decorator ()
  @Match(CreateUserDto, (field) => field.password, {
    message: 'Passwords must match!',
  })
  confirm_password: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  role_id: string
}
