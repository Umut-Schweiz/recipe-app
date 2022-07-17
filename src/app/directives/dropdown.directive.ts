import { Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private elRef:ElementRef) { }

  @HostListener('click') toggleOpen() {
    this.elRef.nativeElement.nextSibling.classList.contains('show')  ?
    this.elRef.nativeElement.nextSibling.classList.remove('show') :
    this.elRef.nativeElement.nextSibling.classList.add('show')
    ;
  }

}
