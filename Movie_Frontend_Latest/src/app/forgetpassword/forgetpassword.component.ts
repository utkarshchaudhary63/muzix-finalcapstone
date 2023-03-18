import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { passwordMisMatch } from '../ConfirmPassword/conPasswoed';
import { UserService } from '../service/user.service';

import { emailValidator } from '../ConfirmPassword/email';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent
 {
  constructor(private userservice:UserService,private route:Router,private fb: FormBuilder,private snak:MatSnackBar){}

  loggedin:boolean=false;
  response:any="";

  passwordForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email,emailValidator()]],
      password:['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]],
      confirmPassword: ["", Validators.required]
    },{
      validator : [ passwordMisMatch ]
  });

  openemail:boolean=true;


  get email()
  {
    return this.passwordForm.get('email');
  }

  get password()
  {
    return this.passwordForm.get('password');
  }

  get confirmPassword(){
    return this.passwordForm.get('confirmPassword');
  }

  otpsubmit = this.fb.group(
    {
  one:["",Validators.required],
  two:["",Validators.required],
  three:["",Validators.required],
  four:["",Validators.required] 
  });
  
  get one(){
      return this.otpsubmit.get('one');
    }
    get two(){
      return this.otpsubmit.get('two');
    }
    get three(){
      return this.otpsubmit.get('three');
    }
    get four(){
      return this.otpsubmit.get('four');
    }
  



 //------------------------------------------------------------------
  onupdate()
  {
    localStorage.setItem('updateemail',this.passwordForm.get("email")?.value+"");
    console.log(localStorage.getItem('updateemail'));
      this.userservice.updatepassword(this.passwordForm.value).subscribe(
        (data:any)=>{
          
          this.response=data;
    
       Swal.fire('Success',
        'You updated password Succesfully',
        'success')
     

      this.route.navigate(["login"]);
      
    },err=>
    {
      this.snak.open(
        "You have provide wrong Email !!", "WRONG",{
          duration:5000,
        });
    }
  ) 
    }
//============================================================================
    openotp:boolean=false;
  isShow:boolean= false;
  passwordopen:boolean=false;
  buttonText = 'send otp';
  showPassword = false;
  showConfirmPassword = false;

    otppage()
    {
      this.buttonText = 'resend otp ..';
      Swal.fire("success", "Otp has been sent succesfully","success");
      localStorage.setItem('emailStorage',this.passwordForm.get("email")?.value+"");
      this.userservice.generateotp(localStorage.getItem("emailStorage")).subscribe(
        (data:any)=>{
     
        console.log(data);


      })
      ;
      
  
      this.openotp=true;
      
    }
    

    //=======================================================================
 move(e:any,p:any,c:any,n:any)
 {
var length=c.value.length;
var maxlength=c.getAttribute('maxlength');
if(length==maxlength)
{
  if(n!="")
  {
    n.focus();
  }
}
if(e.key==="Backspace")
{
  if(p!="")
  {
  p.focus();
  }
}
 }
//---------------------------------------------------------------------


  showNext:boolean=false;
  resultotp:any


    on()
    {
      localStorage.setItem('otpStorage',this.otpsubmit.get("one")?.value+""+this.otpsubmit.get("two")?.value+""+
      this.otpsubmit.get("three")?.value+""+this.otpsubmit.get("four")?.value+"");
      console.log(localStorage.getItem("otpStorage"));
      this.userservice.checkOtp(localStorage.getItem("otpStorage")).subscribe
(data=>{
       this.resultotp=data
       console.log(this.resultotp)
       alert(this.resultotp);
       
         if(localStorage.getItem("otpStorage")==this.resultotp)
  {       
 Swal.fire('Success',
      'Otp is succesffully verified',
      'success'); 
    
      this.passwordopen=true;
      this.openotp=false;
      this.openemail=false;
    
        }

         else{
          Swal.fire('Sorry',
          'Otp not verified',
          'error'); 

         }
        
        
        }
       
    )
    }




}
