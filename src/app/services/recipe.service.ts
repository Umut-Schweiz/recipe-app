import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../shared/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
/*
  private recipes: Recipe[] = [
    {
      id: "1",
      name: 'recipe 1',
      description: 'Recipe testing 1',
      imageUrl: 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1492&q=80',
      ingredients: [
        {
          id:'1',
          name: 'recipe 3',
          amount: 7
        },
        {
          id:'2',
          name: 'recipe 3',
          amount: 7
        }
      ]
    },
    {
      id: "2",
      name: 'recipe 2',
      description: 'Recipe testing 2',
      imageUrl: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=806&q=80',
      ingredients: [
        {
          id:'2',
          name: 'recipe 3',
          amount: 5
        }
      ]
    }
  ];
  */

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
