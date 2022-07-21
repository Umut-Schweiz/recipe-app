import { Ingredient } from "./ingredient.model";

export class Recipe {
  id!: string;
  name!: string;
  description!: string;
  imageUrl!: string;
  ingredients!: Ingredient[];
}
