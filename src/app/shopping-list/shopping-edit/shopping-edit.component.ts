import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef!:ElementRef;
  @ViewChild('amountInput') amountInputRef!:ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }
  onAddItem(event:any){
    event.preventDefault();
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient:Ingredient = {
      name: ingName,
      amount: ingAmount
    }
    this.ingredientAdded.emit(newIngredient);
  }
}
