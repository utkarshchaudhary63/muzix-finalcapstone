import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrev]'
})
export class PrevDirective {

  constructor(private el:ElementRef) { }

  @HostListener('click')
  prevFunction(){
   var elm = this.el.nativeElement.parentElement.parentElement.children[0];
   var movie = elm.getElementsByClassName("movie")
   //console.log(movie)
   elm.prepend(movie[movie.length-1])
  }

}
