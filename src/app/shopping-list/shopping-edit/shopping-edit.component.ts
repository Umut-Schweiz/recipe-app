import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm!: NgForm;
  subscription!: Subscription;
  editMode=false;
  editedItemId!:string;
  deletedItemId!:string;
  editedItem!:Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription =  this.shoppingListService.startedEditing
      .subscribe((id : string) => {
        this.editedItemId = id;
        this.deletedItemId = id;
        this.editMode=true;
        this.editedItem = this.shoppingListService.getIngredient(id);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      })
  }
  onSubmit(form : NgForm){
    const value = form.value;
    const newIngredient:Ingredient = {
      id: uuidv4(),
      name: value.name,
      amount: value.amount
    }
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemId, newIngredient)
    }else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.onClear();
    this.shoppingListService.deleteIngredient(this.deletedItemId)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
