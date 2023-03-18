import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent 
{
  constructor(private fb: FormBuilder,private userService:UserService,private route:Router){}
  show:boolean=true;
  users:any={};
  user:any=localStorage.getItem('user');
  Users:any;
  profileImage:any;

  Account:any={};
  amount:any;

  ngOnInit(): void {
    this.userService.getuser(this.user).subscribe(data=>{
      console.log(data)
      this.users=data;
      })
      
      this.userService.getusers(localStorage.getItem('formdata')).subscribe(data=>{
        this.Users=data;
        this.profileImage=this.Users.profilePic;
        console.log(this.Users);
        
       })
       this.getuserdetail();


  }

  getuserdetail(){
    this.userService.getAccount(localStorage.getItem('formdata')).subscribe(data=>{
  this.Account=data;
  this.amount=this.Account.amount;
  console.log(this.amount);
  })
  }
 
  adduser(){
if(this.amount==299){
    this.route.navigate(["adduser"]);}
    else{
      Swal.fire('Failure',
        'You Have To be a Platinum  subscribed member To create multiple profile',
        'error')
      this.route.navigate(["sub"]); 
    }

  }

  navigate(data:any){
    localStorage.setItem("user",data);
    console.log(localStorage.getItem('user'))
    this.route.navigate(["dashboard"]);
  }
  Edituser(){
this.route.navigate(['updateuser']);
  }

  Deleteuser(){
    this.userService.deleteuser(this.user).subscribe(data=>{
      Swal.fire('Success',
      'You Have deleted user Succesfully',
      'success');
    
      this.route.navigate(['users'])
      this.getuserdetail();
    
    })
  
 
  }


  amountcheck()
{
  alert(this.amount);
  console.log(this.amount);
}


UpdateProfile()
{
  
  this.route.navigate(["updateuser"])
}





}
