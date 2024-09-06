import { Exclude, Expose } from "class-transformer";
import { IsArray, IsUUID } from "class-validator";

@Exclude()
export class getProductsForUserFridgeBody {
  @Expose()
  @IsUUID()
  public user: string;
}
