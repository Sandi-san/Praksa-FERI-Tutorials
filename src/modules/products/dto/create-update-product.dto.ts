import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateUpdateProductDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string

  @IsOptional()
  image?: string

  @IsNotEmpty()
  price: number
}
