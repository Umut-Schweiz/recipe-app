import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { DropdownDirective } from './directives/dropdown.directive';
import { ManageDropdownDirective } from './directives/manage-dropdown.directive';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ManageDropdownDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, // because of lazzy loading i didnt add ShoppingListModule and RecipesModule into here
    AuthModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
