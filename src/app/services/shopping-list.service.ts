import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<string>();

  private ingredients: Ingredient[] = [
    {
      id: "1",
      name: 'Apple',
      amount: 5,
    },
    {
      id: "2",
      name: 'Tomatos',
      amount: 12,
    }
  ];
  constructor() { }

  getIngredients():Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(id:string):Ingredient | any{
    return this.ingredients.find(i => i.id == id);
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(id:string, newIngredient:Ingredient){
     this.ingredients.find( ing => {
      if(ing.id === id){
        ing.id = newIngredient.id;
        ing.name = newIngredient.name;
        ing.amount = newIngredient.amount;
      }
      this.ingredientsChanged.next(this.ingredients.slice())
    });
  }

  deleteIngredient(id : string){
    const deletedItem:Ingredient | any = this.ingredients.find(i => i.id == id)
    const indexOfDeletedItem = this.ingredients.indexOf(deletedItem)
    this.ingredients.splice(indexOfDeletedItem, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
