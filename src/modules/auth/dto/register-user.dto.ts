import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator'
import { Match } from 'decorators/match.decorator'

export class RegisterUserDto {
  @IsOptional()
  first_name?: string

  @IsOptional()
  last_name?: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @Matches(/^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&+=`|{}:;!.?"()[\]-]{6,}/, {
    message:
      'Password must contain one number, one uppercase or lowercase letter and has to be longer than 5 characters!',
  })
  password: string

  @IsNotEmpty()
  //custom decorator ()
  @Match(RegisterUserDto, (field) => field.password, {
    message: 'Passwords must match!',
  })
  confirm_password: string

  role_id: string
}
