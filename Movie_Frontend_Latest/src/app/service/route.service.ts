import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
 
 
  navigateToLoginPage() {
    throw new Error('Method not implemented.');
  }

  constructor(private route:Router) { }


  tologinPage ()
  {
    this.route.navigate(["login"])
  }

  navigateToLandingPage()
  {
    this.route.navigate([''])
  }
}
