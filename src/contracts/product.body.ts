import { Exclude, Expose } from "class-transformer";
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from "class-validator";

@Exclude()
export class ProductBody {
  @Expose()
  @IsNumber()
  public size: number;

  @Expose()
  @IsUUID()
  @IsOptional()
  public user?: string;

  @Expose()
  @IsUUID()
  @IsOptional()
  public fridge?: string;

  @Expose()
  @IsUUID()
  @IsOptional()
  public recipe: string;
}
