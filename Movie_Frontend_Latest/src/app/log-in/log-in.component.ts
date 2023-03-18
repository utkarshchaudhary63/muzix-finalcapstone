import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  constructor(private userservice:UserService,private route:Router){}
  loggedin:boolean=false;
  response:any="";
  showPassword:boolean=false;
  loginForm = new FormGroup({
    "email" : new FormControl('',[Validators.required]),
    "password" : new FormControl('',[Validators.required]),
    
  });
  get email()
  {
    return this.loginForm.get('email');
  }

  get password()
  {
    return this.loginForm.get('password');
  }
 
  onlogin()
  {
    localStorage.setItem('formdata',this.loginForm.get("email")?.value+"");
      this.userservice.logincheck(this.loginForm.value).subscribe(
        (data:any)=>
        {
          
          this.response=data;
          console.log(this.response.token);
       localStorage.setItem("jwttoken",this.response.token);
       console.log(localStorage.getItem('jwttoken'))
       if(this.response.token!==null)
       {
        this.loggedin=true;
        }
       console.log(this.loggedin);
       localStorage.setItem('loggedin',this.loggedin+"");

       this.userservice.loggedIn();  

       console.log(localStorage.getItem('formdata'))
       console.log(localStorage.getItem('loggedin'))
      
       Swal.fire('Success',
        'You Have Logged In Succesfully',
        'success')
     

      this.route.navigate(["users"]);
      
    },err=>
    {

  Swal.fire('Sorry !! ','Incorrect email or password','error');
    }
  ) 
    }


    
  }
