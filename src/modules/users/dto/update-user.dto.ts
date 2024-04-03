import { IsEmail, IsOptional, Matches, ValidateIf } from 'class-validator'
import { Match } from 'decorators/match.decorator'

export class UpdateUserDto {
  @IsOptional()
  first_name?: string

  @IsOptional()
  last_name?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @ValidateIf((o) => typeof o.password === 'string' && o.password.length > 0)
  @IsOptional()
  @Matches(/^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&+=`|{}:;!.?"()[\]-]{6,}/, {
    message:
      'Password must contain one number, one uppercase or lowercase letter and has to be longer than 5 characters!',
  })
  password?: string

  @ValidateIf((o) => typeof o.confirm_password === 'string' && o.confirm_password.length > 0)
  @IsOptional()
  //custom decorator ()
  @Match(UpdateUserDto, (field) => field.password, {
    message: 'Passwords must match!',
  })
  confirm_password?: string

  // @IsOptional()
  // refresh_token?: string

  @IsOptional()
  role_id?: string

  @IsOptional()
  avatar?: string
}
