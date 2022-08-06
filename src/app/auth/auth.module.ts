import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AlertComponent } from "../shared/alert/error-alert/alert.component";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations:[
      AuthComponent,
      AlertComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild( [ {path: 'auth', component: AuthComponent} ] )
    ]
})
export class AuthModule {}
