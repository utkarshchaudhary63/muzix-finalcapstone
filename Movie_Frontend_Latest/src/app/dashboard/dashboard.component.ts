import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import Swal from 'sweetalert2';
import { Movie } from '../model/Movie';
import { FavlistService } from '../service/favlist.service';
import { MovieService } from '../service/movie.service';
import { SearchService } from '../service/search.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listdetails: any;
  
  constructor( private movieser:MovieService,private route:Router,private searchService:SearchService,
    private favser: FavlistService ,private userservice:UserService)
  
  {
    this.allMovies
  }

  ngOnInit(): void
   {
    this.getLatestMovie();
    this.getPopularMovie();
    this.getUpcomingMovies();
    this.getMovies();
    this.trailerInit();
    this.getuserdetail();
    }

    responseKey:any={};
    trailerUrl:String="";
  movies:any=[];
  allMovies:any=[];
  popularMovies:any=[];
  latestMovie:any=[];
  upComing:any=[];
  current:any;
  movie:any;
  searchData:any=[];
  currentPg:number=1;
  user:any=localStorage.getItem('formdata');
  Account:any={};
  amount:any;
  favlistname:String="mylist";

  favmovie:any=
  {
    adult:true,backdrop_path:"",
  genre_ids: [""],
  id:0,original_language: "",
  original_title: "",
  overview:"",
  popularity: "",poster_path: "",
  release_date:"",video:"",
  vote_average:"",vote_count:""
}


increasePage() {
  this.currentPg++;
 
  this.getLatestMovie();
  this.getPopularMovie();
  this.getUpcomingMovies();
  this.getMovies();
  this.trailerInit();
}
decreasePage() {
  this.currentPg--;
 
  this.getLatestMovie();
  this.getPopularMovie();
  this.getUpcomingMovies();
  this.getMovies();
  this.trailerInit();

}
 
getuserdetail(){
  this.userservice.getAccount(this.user).subscribe(data=>{
this.Account=data;
this.amount=this.Account.amount;
console.log(this.amount);
})
}

getMovies() 
{
  this.movieser.getAllMovies(this.currentPg+3).subscribe(res => {
    this.movies = res;
    console.log(this.movies);
    this.allMovies = this.movies.results;
    console.log(this.allMovies);
  })
}


getPopularMovie()
{
  this.movieser.getPopularMovie(this.currentPg).subscribe(res=>{
    this.movies = res;
    console.log(this.movies);
    this.popularMovies = this.movies.results;
    console.log(this.popularMovies);
  })
}

getLatestMovie()
{
  this.movieser.getLatestMovie(this.currentPg).subscribe(res=>{
    this.movies = res;
    console.log(this.movies);
    this.latestMovie = this.movies.results;
    console.log(this.latestMovie);
  })
}

getUpcomingMovies()
{
  this.movieser.getUpcomingMovies(this.currentPg).subscribe(res=>{
    this.movies = res;
    console.log(this.movies);
    this.upComing = this.movies.results;
    console.log(this.upComing);
  })
}

id:any=631842;
trailerInit()
 {
  this.movieser.getTrailer(this.id).then((data) => 
  {
    this.responseKey = data;
    for (let obj of this.responseKey.results) {
      // console.log(obj.name)
      if (obj.name.includes("Trailer")) {
        let key = obj.key
        this.trailerUrl = `//www.youtube.com/embed/${key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1`;
        break;
      }
    }

  })
}


addToFavroites(data:any)
{
  if(this.amount>=199)
  {
  console.log(data)
 this.favser.addMovie(data).subscribe(
  (res:any) =>
  {
  this.listdetails=res;
  alert(this.listdetails);
console.log(this.listdetails);
if(this.listdetails===false)
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




searchValue:any;

    search(searchValue:any)
    {
      this.searchService.getSearchMovies(this.searchValue).subscribe(data=>
        {
         this.searchData=data;
         console.log(data);
    this.allMovies=this.searchData;
   
        })

    }
}
