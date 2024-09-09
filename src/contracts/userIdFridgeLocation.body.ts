import { Exclude, Expose } from "class-transformer";
import { IsString, IsUUID } from "class-validator";

@Exclude()
export class userIdFridgeLocationBody {
  @Expose()
  @IsUUID()
  public user: string;

  @Expose()
  @IsString()
  public fridgeLocation: string;
}
