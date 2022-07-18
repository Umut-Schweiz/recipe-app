import { Injectable } from '@angular/core';
import { Recipe } from '../shared/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    {
      id: 1,
      name: 'recipe 1',
      description: 'Recipe testing 1',
      imageUrl: 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1492&q=80',
      ingredients: [
        {
          name: 'recipe 3',
          amount: 7
        }
      ]
    },
    {
      id: 2,
      name: 'recipe 2',
      description: 'Recipe testing 2',
      imageUrl: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=806&q=80',
      ingredients: [
        {
          name: 'recipe 3',
          amount: 5
        }
      ]
    }
  ];

  constructor() { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number):Recipe | any{
    return this.recipes.find(recipe => recipe.id === id);
  }
}
