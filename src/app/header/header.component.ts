import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() selectedComp = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  selectComp(select:number){
    this.selectedComp.emit(select); ;
  }

}
