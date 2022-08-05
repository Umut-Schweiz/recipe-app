import { Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private elRef:ElementRef) { }
  @HostBinding('class.show') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.elRef.nativeElement.nextSibling.classList.contains('show')  ?
    this.elRef.nativeElement.nextSibling.classList.remove('show') :
    this.elRef.nativeElement.nextSibling.classList.add('show')
    ;
  }

}
