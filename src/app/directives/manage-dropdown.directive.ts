import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appManageDropdown]'
})
export class ManageDropdownDirective {

  constructor(private elRef:ElementRef) { }
  @HostBinding('class.show') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.elRef.nativeElement.parentElement.classList.contains('show')  ?
    this.elRef.nativeElement.parentElement.classList.remove('show') :
    this.elRef.nativeElement.parentElement.classList.add('show')
    ;
  }

}
