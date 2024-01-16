import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = '';
  }

  constructor(
    private element: ElementRef
  ) {}

}

// import { Directive, ElementRef, HostListener } from '@angular/core';

// //Manipulación del DOM
// @Directive({
//   selector: '[appHighlight]'
// })
// export class HighlightDirective {

//   @HostListener('mouseenter') onMouseEnter(){
//     this.element.nativeElement.style.backgroundColor = '#ACD9B2';
//   }


//   @HostListener('mouseleave') onMouseLeave(){
//     this.element.nativeElement.style.backgroundColor = '';
//   }

//   constructor(
//     private element: ElementRef // Inyección de dependecias
//   ) {
//     //this.element.nativeElement.style.backgroundColor = 'red' //Elemento nativo de JavaScript, no de angular.
//    }

// }
