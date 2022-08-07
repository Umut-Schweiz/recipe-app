import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthModule } from './auth/auth.module';
import { ManageDropdownDirective } from './directives/manage-dropdown.directive';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ManageDropdownDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, // because of lazzy loading i didnt add ShoppingListModule and RecipesModule into here
    AuthModule,
    SharedModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
