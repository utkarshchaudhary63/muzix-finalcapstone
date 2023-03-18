import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FavlistService } from '../service/favlist.service';
import { MovieService } from '../service/movie.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
constructor(private MovieSer:MovieService,private route:Router,private favser:FavlistService,private userService:UserService){}
  ngOnInit(): void {
    this.getRecommendMovies();
   this. getlatest();
   this.getuserdetail();
   
  }

  
  Movieid:number=0;
  currentPg:number=1;
  recommendedMovies: any=[];
  allRecommendedMovies: any=[];

  getlatest(){
this.MovieSer.getlatest().subscribe(res=>{
  let movieid=res;
  console.log(movieid)
  console.log(movieid.id)
  this.Movieid=movieid.id;
})
  }
getRecommendMovies()
{ 
  this.MovieSer.getAllRecommendedMovies(635302,this.currentPg).subscribe(res => {
    this.recommendedMovies = res;
    this.allRecommendedMovies = this.recommendedMovies.results;
    console.log("this is the recommended movies");
    console.log(this.allRecommendedMovies);
  });
}
increasePage() {
  this.currentPg++;
 
  this.getRecommendMovies();
}
decreasePage() {
  this.currentPg--;
 
  this.getRecommendMovies();

}


user:any=localStorage.getItem('formdata');
Account:any={};
amount:any;



playrecom(){
  Swal.fire('sorry','you have to buy a subscription plan to watch movies','error')
  this.route.navigate(["sub"])
}
//================================================================================================FAVOURITE=====================================

listdetails: any;
addToFavroites(data:any)
{
  if(this.amount>=199)
  {
  console.log(data)
 this.favser.addMovie(data).subscribe(
  (res:any) =>
  {
  this.listdetails=res;

if(this.listdetails==false)
{
  Swal.fire('Congrats',
  'Movie is added Successfully ',
  'success')
}
else{
 
Swal.fire('Sorry',
  'Movie is already Added',
  'error')
}
  })

}
else
{
  Swal.fire('Failure',
  'You have To be a Gold or Platinum Member to add movies to FavouriteList ',
  'error')
  this.route.navigate(["sub"])
}
}
getuserdetail(){
  this.userService.getAccount(localStorage.getItem('formdata')).subscribe(data=>{
this.Account=data;
this.amount=this.Account.amount;
console.log(this.amount);
})
}



}
