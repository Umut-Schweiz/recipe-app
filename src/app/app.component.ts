import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loadPage:number = 1;


  constructor() {
    console.log(this.loadPage)
  }

  onNavigate(select: number){
    this.loadPage = select;
  }
}
