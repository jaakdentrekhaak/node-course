import { Exclude, Expose } from "class-transformer";
import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";

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

  @Expose()
  @IsArray()
  @IsOptional()
  public ingredients: string[];
}
