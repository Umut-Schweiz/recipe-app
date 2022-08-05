import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../../shared/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes!: Recipe[];
  private subscribtion!: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscribtion = this.recipeService.recipesChanged // it isn't necessary to subscribe - best practice- recommended aproach here
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      )
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipes = this.recipeService.getRecipes()
  }

  onNewRecipe(){
    this.router.navigate(['new'], { relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }
}
