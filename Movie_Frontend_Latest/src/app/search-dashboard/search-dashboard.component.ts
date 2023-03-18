import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { MovieService } from '../service/movie.service';
import { SearchService } from '../service/search.service';
import { UserService } from '../service/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FavlistService } from '../service/favlist.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-search-dashboard',
  templateUrl: './search-dashboard.component.html',
  styleUrls: ['./search-dashboard.component.css']
})
export class SearchDashboardComponent implements OnInit
{
  constructor(private userService:UserService ,private searchService:SearchService,private movieSer:MovieService,private route:Router,private favser:FavlistService)
  { 
    this.getMovies();
  }

  Searchtext:any="";
  searchMovies:any=[];
  users:any={};
  searchValue:string="";
  profileImage:any;
  name:any;
  recommendedMovies: any;
  allRecommendedMovies: any;
  user:any=localStorage.getItem('formdata');
  currentPg: number = 1;
  allMovies: any=[];
  movie:any={};
  responseKey:any={};
  trailerUrl:String="";
  searchData:any={};
  Account:any={};
  amount:any;
  
  ngOnInit(): void 
  {
    this.userService.getuser(localStorage.getItem('user')).subscribe(data=>{
      console.log(data)
      
      this.users=data;
      this.profileImage=this.users.profilePic;
      this.name=this.users.firstName;
    });
 this.fetchSearchMovies();
  this.getuserdetail();
  }

 
  getuserdetail(){
    this.userService.getAccount(this.user).subscribe(data=>{
  this.Account=data;
  this.amount=this.Account.amount;
  
  console.log(this.amount);
  })
  }




  // ================================================PAGE====================================================
  increasePage() {
    this.currentPg++;
    this.fetchSearchMovies();
    this.getMovies();
    this.byAction();
    this.byRomance();
    this.byThriller();
    this.byComedy();
    this.byHorror();
    this.byEnglish();
    this.byHindi();
    this.byJapan();
    this.byTolly();this.above9();this.above8();this.above7();this.above6();this.below6();
    this.VeryOld();this.latest();this.up();
  }
  decreasePage() {
    this.currentPg--;
    this.fetchSearchMovies();
    this.getMovies();
this.byAction();
this.byRomance();
this.byThriller();
this.byComedy();
this.byHorror();
this.byEnglish();
this.byHindi();
this.byJapan();
this.byTolly();
this.above9();this.above8();this.above7();this.above6();this.below6();
this.VeryOld();this.latest();this.up();
  }
  getMovies() 
  {
    this.movieSer.getAllMovies(this.currentPg).subscribe(res => {
      this.movie = res;
      console.log(this.movie);
      this.allMovies = this.movie.results;
      console.log(this.allMovies);
    })
  }

 hindi:string= "hindi";
modifiedSearchedText:any=[];
fetchSearchMovies()
{
  this.searchService.getSearchMovies(this.searchValue).subscribe(data=>
    { 
      this.searchData=data;
      console.log( this.searchData);
    this.searchMovies=this.searchData.results;
    }, err => {
      window.alert("Error while fetching the latest movies!" + err)
    })
}

logout()
{
  this.userService.deactivateOut();
  this.userService.isLoggedIn=false;
localStorage.clear();
  this.route.navigate(["LandingPage"])
}
// =========================================ON SEARCH TEXT==============================================

reset()
{
  this.searchValue="";
}



onSearchTextChanged()
{
  this.fetchSearchMovies();
}

show:boolean=false;
ondrop()
{
  if (!this.show)
  {
this.show=true;
  }
  else{
    this.show=false;
  }

}


// --------------------------------------genre--------------------------------------------------

genre:any;

byAction()
{
  this.genre=28;
  this.searchService.getSearchMoviesByGenre(this.genre,this.currentPg).subscribe((data:any)=>
    {
      this.searchData=data;
      this.searchMovies=this.searchData.results;
      console.log(this.searchData);
    },
    
    (err:any) => {
      window.alert("Error while fetching the latest movies!" + err)
    })
}

byRomance()
{
  this.genre=10749;
  this.searchService.getSearchMoviesByGenre(this.genre,this.currentPg).subscribe((data:any)=>
    {
      this.searchData=data;
      this.searchMovies=this.searchData.results;
      console.log(this.searchData);
    }, 
    (err:any) => {
      window.alert("Error while fetching the latest movies!" + err)
    })
}

byComedy()
{
  this.genre=35;
  this.searchService.getSearchMoviesByGenre(this.genre,this.currentPg).subscribe((data:any)=>
    {
      this.searchData=data;
      this.searchMovies=this.searchData.results;
      console.log(this.searchData);
    },
    (err:any) => {
      window.alert("Error while fetching the latest movies! " + err)
    })
}

byThriller()
{
  this.genre=53;
  this.searchService.getSearchMoviesByGenre(this.genre,this.currentPg).subscribe((data:any)=>
    {
      this.searchData=data;
      this.searchMovies=this.searchData.results;
      console.log(this.searchData);
    },
    
    (err:any) => {
      window.alert("Error while fetching the latest movies!" + err)
    })
}

byHorror()
{
  this.genre=27;
  this.searchService.getSearchMoviesByGenre(this.genre,this.currentPg).subscribe((data:any)=>
    {
      this.searchData=data;
      this.searchMovies=this.searchData.results;
      console.log(this.searchData);
    },
    
    (err:any) => {
      window.alert("Error while fetching the latest movies!" + err)
    })
}

language:String="";
byEnglish()
{
  this.language="en";
  this.searchService.getSearchMoviesByLanguage(this.language,this.currentPg).subscribe((data:any)=>
    {
      this.searchData=data;
      this.searchMovies=this.searchData.results;
      console.log(this.searchData);
    },
    
    (err:any) => {
      window.alert("Error while fetching the latest movies!" + err)
    })

}
byHindi(){
  this.language="hi";
this.searchService.getSearchMoviesByLanguage(this.language,this.currentPg).subscribe((data:any)=>
  {
    this.searchData=data;
    this.searchMovies=this.searchData.results;
    console.log(this.searchData);
  },
  
  (err:any) => {
    window.alert("Error while fetching the latest movies!" + err)
  })}
byJapan(){

  this.language="ja";
  this.searchService.getSearchMoviesByLanguage(this.language,this.currentPg).subscribe((data:any)=>
    {
      this.searchData=data;
      this.searchMovies=this.searchData.results;
      console.log(this.searchData);
    },
    
    (err:any) => {
      window.alert("Error while fetching the latest movies!" + err)
    })
}
byTolly(){

  this.language="bn";
  this.searchService.getSearchMoviesByLanguage(this.language,this.currentPg).subscribe((data:any)=>
    {
      this.searchData=data;
      this.searchMovies=this.searchData.results;
      console.log(this.searchData);
    },
    
    (err:any) => {
      window.alert("Error while fetching the latest movies!" + err)
    })
}

// ==============================================FAVOURITE===================================
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






// ----------------------------------RATING----------------------============================
rating:any;
above9()
{

  this.rating=9;
  this.searchService.getSearchMoviesByRating(this.rating,this.currentPg).subscribe((data:any)=>
  {
    this.searchData=data;
    this.searchMovies=this.searchData.results;
    console.log(this.searchData);
  },
  
  (err:any) => {
    window.alert("Error while fetching the latest movies!" + err)
  })
}

above8(){
  
  this.rating=8;
  this.searchService.getSearchMoviesByRating(this.rating,this.currentPg).subscribe((data:any)=>
  {
    this.searchData=data;
    this.searchMovies=this.searchData.results;
    console.log(this.searchData);
  },
  
  (err:any) => {
    window.alert("Error while fetching the latest movies!" + err)
  })

}
above7()
{
  this.rating=7;
  this.searchService.getSearchMoviesByRating(this.rating,this.currentPg).subscribe((data:any)=>
  {
    this.searchData=data;
    this.searchMovies=this.searchData.results;
    console.log(this.searchData);
  },
  (err:any) => {
    window.alert("Error while fetching the latest movies!" + err)
  })
}
above6(){
  this.rating=6;
  this.searchService.getSearchMoviesByRating(this.rating,this.currentPg).subscribe((data:any)=>
  {
    this.searchData=data;
    this.searchMovies=this.searchData.results;
    console.log(this.searchData);
  },
  (err:any) => {
    window.alert("Error while fetching the latest movies!" + err)
  })
}

below6()
{
  this.rating=6;
  this.searchService.getSearchBelowRating(this.rating,this.currentPg).subscribe((data:any)=>
  {
    this.searchData=data;
    this.searchMovies=this.searchData.results;
    console.log(this.searchData);
  },
  (err:any) => {
    window.alert("Error while fetching the latest movies!" + err)
  })
}
// ----------------------------------TIME----------------------============================


up()
{
this.searchService.getSearchByUpcom(this.currentPg).subscribe(data=>
    {
      this.searchData=data;
      this.searchMovies=this.searchData.results;
      console.log(this.searchData);
    },
    (err:any) => {
      window.alert("Error while fetching the latest movies!" + err)
    })
}

latest()
{
this.searchService.getSearchByLatest(this.currentPg).subscribe(data=>
  {
    this.searchData=data;
    this.searchMovies=this.searchData.results;
    console.log(this.searchData);
  },
  (err:any) => {
    window.alert("Error while fetching the latest movies!" + err)
  })
}


medium()
{
  this.searchService.getSearchByMedium(this.currentPg).subscribe(data=>
    
    {
      this.searchData=data;
      this.searchMovies=this.searchData.results;
    console.log(this.searchData);
    },(err:any) => {
      window.alert("Error while fetching the latest movies!" + err)
    })
  }


VeryOld()
{
  this.searchService.getSearchByOlder(this.currentPg).subscribe(data=>
  {
    this.searchData=data;
    this.searchMovies=this.searchData.results;
    console.log(this.searchData);
    },(err:any) => {
      window.alert("Error while fetching the latest movies!" + err)
    })
  }
 


}
