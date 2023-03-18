import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { MovieService } from '../service/movie.service';
import { RouteService } from '../service/route.service';
import { SearchService } from '../service/search.service';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit 
{
  

   responseData: any;
  constructor(private userService:UserService ,private searchService:SearchService,private movieSer:MovieService,private route:Router,private rout:RouteService,private breakpointObserver:BreakpointObserver){}

  
  users:any={};
  profileImage:any;
  name:any;
 
  searchValue:any;
movie:any={};
responseKey:any={};
trailerUrl:String="";
searchData:any={};

  ngOnInit(): void {
    this.userService.getuser(localStorage.getItem('user')).subscribe(data=>{
      
      this.users=data;
      this.profileImage=this.users.profilePic;
      this.name=this.users.firstName;
    })
    this.getuserdetail();

  }

  playlist(){}
  show1:boolean=false;
  onSearchTextChanged()
  {
    this.userService.isDeactivate=false;
    this.route.navigate(["search"]);
    
  }

logout()
{
  this.userService.deactivateOut();
  this.userService.isLoggedIn=false;
// localStorage.clear();
localStorage.removeItem("jwttoken");
  this.route.navigate(["LandingPage"])

}


user:any=localStorage.getItem('formdata');
Account:any={};
amount:any;
sub:any;
getuserdetail()
{
  this.userService.getAccount(this.user).subscribe(data=>{
this.Account=data;
this.amount=this.Account.amount;
console.log(this.amount);

if(this.amount==149)
{
this.sub="silver";
}

else{

  if(this.amount==199)
  {
  this.sub="gold";
  }
  else(this.amount==299)
  {
  this.sub="platinum";
  }
}

console.log(this.sub);

})
}

amount1=149;


}
