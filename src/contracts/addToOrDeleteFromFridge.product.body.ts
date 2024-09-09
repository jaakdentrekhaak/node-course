import { Exclude, Expose } from "class-transformer";
import { IsUUID } from "class-validator";

@Exclude()
export class addToOrDeleteFromFridgeProductBody {
  @Expose()
  @IsUUID()
  public fridge: string;
}
