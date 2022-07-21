import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../../shared/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe!: Recipe;
  currentRecipeId!:string;

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.currentRecipeId = params['id'];
          this.getRecipe(this.currentRecipeId)
        }
      );
  }

  getRecipe(id:string):void {
    this.recipe = this.recipeService.getRecipe(id)

  }

  onAddToShoppingList(ingredients: Ingredient[]){
    this.router.navigate(['/shopping-list'] )
    this.shoppingListService.addIngredients(ingredients);
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.currentRecipeId);
    this.router.navigate(['/recipes'])
  }


}
