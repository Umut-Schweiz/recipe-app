import { Ingredient } from "./ingredient.model";

export class Recipe {
  id!: number;
  name!: string;
  description!: string;
  imageUrl!: string;
  ingredients!: Ingredient[];
}
