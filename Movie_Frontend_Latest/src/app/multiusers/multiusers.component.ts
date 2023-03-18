import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-multiusers',
  templateUrl: './multiusers.component.html',
  styleUrls: ['./multiusers.component.css']
})
export class MultiusersComponent implements OnInit{
  constructor(private Userser:UserService,private route:Router){}
  Users:any=[];
  profileImage:any;

  user:any=localStorage.getItem('formdata');
  
  ngOnInit(): void {
   this.Userser.getusers(localStorage.getItem('formdata')).subscribe(data=>{
    this.Users=data;
    this.profileImage=this.Users.profilePic;
    console.log(this.Users);
    
   })
  }
navigate(data:any){
  localStorage.setItem("user",data);
  console.log(localStorage.getItem('user'))
  this.route.navigate(["dashboard"]);
}

manage(){
  this.route.navigate(["adduser"])
}
}
