import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { FavlistService } from '../service/favlist.service';
import { MovieService } from '../service/movie.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit{
  responseKey: any;
  trailerUrl: string="";
  languages: string="";
  genreName: string="";
  permit: string="";
  currentPg:number=1;
  recommendedMovies: any=[];
  allRecommendedMovies: any=[];
constructor(private activateroute:ActivatedRoute,private movieservice:MovieService , private favser:FavlistService,private route:Router,private userservice:UserService){}

movie:any={};
movieid:any;
Movieid:number=0;

  ngOnInit(): void 
  {
    this.activateroute.paramMap.subscribe(params =>
       {
      this.movieid = params.get("id") ;
      this.Movieid=parseInt(this.movieid)
console.log(this.Movieid);
      this.movieservice.getTrailer(+this.Movieid).then((data:any) => 
        {
        this.responseKey = data;
        console.log(data);
        for (let obj of this.responseKey.results)
         {
          if (obj.name.includes("Trailer"))
          
          {
            let key = obj.key
            this.trailerUrl = `//www.youtube.com/embed/${key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1`;
            this.getdetails();
            this.getdetails1();
            this.getMovieCast();
            this.getdetails2();

          }
        }
    
      })
    });
 
    this.getuserdetail();
    this.getRecommendMovies();
  }

  getdetails(){
    this.movieservice.getmovie(this.Movieid).subscribe(data=>{

      this.movie=data;
      console.log(this.movie);
      if(this.movie.original_language=="en"){
        this.languages="ENGLISH";
      }
      if(this.movie.original_language=="hi"){
        this.languages="HINDI";
      }
      if(this.movie.original_language=="it"){
        this.languages="ITALIAN";
      }
      if(this.movie.original_language=="ja"){
        this.languages="JAPANESE";
      }
      if(this.movie.original_language=="bn"){
        this.languages="BENGALI";
      }
    })
  }

//===================================================

getdetails1(){
  this.movieservice.getmovie(this.Movieid).subscribe(data=>{

    this.movie=data;
    console.log(this.movie);
  if(this.movie.genre==true)
  {this.permit="A"}
  if(this.movie.adult==false)
  {this.permit="U/A"}
  
  })
}
//=============================================================

genreNumber:any
getdetails2(){
  this.movieservice.getmovie(this.Movieid).subscribe(data=>{

    this.movie=data;
    console.log(this.movie);
    this.genreNumber=this.movie.genres[0].name;
    console.log(this.movie.genres[0].name)
  })
}

production:any
getProduction(){
  this.movieservice.getmovie(this.Movieid).subscribe(data=>{

    this.movie=data;
    this.production=this.movie.production_companies[0].name;
    console.log(this.production)
    alert(this.production)
  })


}
//============================================================================
  
getRecommendMovies()
{
  this.movieservice.getAllRecommendedMovies(this.Movieid,this.currentPg).subscribe(res => {
    this.recommendedMovies = res;
    this.allRecommendedMovies = this.recommendedMovies.results;
    console.log("this is the recommended movies");
    console.log(this.allRecommendedMovies);
  });
}

user:any=localStorage.getItem('formdata');
Account:any={};
amount:any;
listdetails: any;


getuserdetail(){
  this.userservice.getAccount(this.user).subscribe(data=>{
this.Account=data;
this.amount=this.Account.amount;
console.log(this.amount);
})
}


//---------------------------------------------favourite-----------------------------------------------------------------------------
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

//------------------------------------------------------Page----------------------------------------------------------------------

increasePage() {
  this.currentPg++;
 
  this.getRecommendMovies();
}
decreasePage() {
  this.currentPg--;
  this.getRecommendMovies();
}
//-----------------------------------------cast-------------------------------------------------------------
getMovieCastResult:any
getMovieCrewResult:any
getMovieCast() {
  this.movieservice.getMovieCast(this.Movieid).subscribe((result)=>{
    console.log(result, 'movieCast#');
    this.getMovieCastResult = result.cast
    this.getMovieCrewResult = result.crew
  })
}

}




