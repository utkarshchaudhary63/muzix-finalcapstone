import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOtp]'
})
export class OtpDirective {

  constructor() { }
  
  @HostListener("click", ["$event"])
  public onClick(event: any): void
  {
      event.preventDefault();
  }

}
