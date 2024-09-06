import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

@Exclude()
export class FridgeView {
  @Expose()
  @IsNumber()
  public id: number;

  @Expose()
  @IsString()
  public location: string;

  @Expose()
  @IsNumber()
  public capacity: number;
}
