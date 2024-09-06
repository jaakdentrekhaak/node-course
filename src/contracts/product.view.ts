import { Exclude, Expose } from "class-transformer";
import { IsNumber } from "class-validator";

@Exclude()
export class ProductView {
  @Expose()
  @IsNumber()
  public id: number;

  @Expose()
  @IsNumber()
  public size: number;
}
