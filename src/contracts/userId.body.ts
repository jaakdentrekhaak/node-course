import { Exclude, Expose } from "class-transformer";
import { IsUUID } from "class-validator";

@Exclude()
export class userIdBody {
  @Expose()
  @IsUUID()
  public user: string;
}
