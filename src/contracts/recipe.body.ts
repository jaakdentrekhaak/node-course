import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString, IsUUID } from "class-validator";

@Exclude()
export class RecipeBody {
  @Expose()
  @IsString()
  public name: string;

  @Expose()
  @IsString()
  public description: string;

  @Expose()
  @IsUUID()
  public user: string;
}
