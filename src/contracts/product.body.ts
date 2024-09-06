import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNumber, IsString, Length } from "class-validator";

@Exclude()
export class ProductBody {
  @Expose()
  @IsNumber()
  public size: number;
}
