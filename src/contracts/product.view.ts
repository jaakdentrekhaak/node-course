import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

@Exclude()
export class ProductView {
  @Expose()
  @IsNumber()
  public id: number;

  @Expose()
  @IsNumber()
  public size: number;

  @Expose()
  @IsString()
  public name: string;
}
