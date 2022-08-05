import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap} from 'rxjs/operators';
import { Recipe } from '../shared/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
  ) { }

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-app-3bb4b-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes
    ).subscribe(response => response);
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      'https://recipe-app-3bb4b-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
    )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
          });
        }),
        tap((recipesData: any | Recipe[]) => {
          this.recipeService.setRecipes(recipesData)
        })
      )
  }

  /*
  handleError(error: HttpErrorResponse | any) {
    let errMsg: string;

    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    } else {
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
    }

    return throwError(() => errMsg);
  }
  */

}
