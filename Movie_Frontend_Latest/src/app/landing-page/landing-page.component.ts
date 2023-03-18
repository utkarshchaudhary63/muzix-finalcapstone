import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit
{
  constructor(private route:Router){}
  ngOnInit(): void {
      
  }
  
  images = ['../../assets/caroImages/img1.jpg', '../../assets/caroImages/img3.jpg', '../../assets/caroImages/img2.jpg'];
  
  onsignup()
{
  this.route.navigate(["signup"])
}

}
