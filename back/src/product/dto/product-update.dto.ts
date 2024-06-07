import { IsNumber, IsString } from 'class-validator';

export class ProductUpdateDto {
  @IsString()
  title: string;
  @IsNumber()
  price: number;
  @IsString()
  description: string;
  @IsString()
  image: string;
  @IsString()
  color: string;
}
