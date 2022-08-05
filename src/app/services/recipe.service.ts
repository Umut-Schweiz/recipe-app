import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../shared/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  recipes:Recipe[] = [];

  constructor() { }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: string):Recipe | any{
    return this.recipes.find(recipe => recipe.id === id);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());

  }

  updateRecipe(id: string, updatedRecipe: Recipe): void {
    this.recipes.find( rec => {
      if(rec.id === id){
        rec.name = updatedRecipe.name;
        rec.imageUrl = updatedRecipe.imageUrl;
        rec.description = updatedRecipe.description;
        rec.ingredients = updatedRecipe.ingredients;
      }
    });
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id:string){
    const deletedItem:Recipe | any = this.recipes.find(i => i.id == id)
    const indexOfDeletedItem = this.recipes.indexOf(deletedItem)
    this.recipes.splice(indexOfDeletedItem, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
