import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    {
      name: 'Apple',
      amount: 5,
    },
    {
      name: 'Tomatos',
      amount: 12,
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdded(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }

}
