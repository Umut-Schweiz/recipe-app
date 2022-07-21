import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  private ingredientChangeSub!: Subscription;// clean up the component after leaving the component
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.getIngredients();
  }

  getIngredients():void{
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientChangeSub = this.shoppingListService.ingredientsChanged
      .subscribe((ingredients:Ingredient[]) => {
          this.ingredients = ingredients;
      })
  }

  ngOnDestroy(): void {
    this.ingredientChangeSub.unsubscribe(); // best practice - recommended pattern
  }

  onEditItem(id:string){
    console.log(id)
    this.shoppingListService.startedEditing.next(id)
  }

}
