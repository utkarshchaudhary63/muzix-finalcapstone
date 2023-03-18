import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileHandle } from './model/userFile';
import { DomSanitizer } from '@angular/platform-browser';
import { passwordMisMatch } from '../ConfirmPassword/conPasswoed';
import { emailValidator } from '../ConfirmPassword/email';
import { interval, map, takeWhile } from 'rxjs';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUPComponent implements OnInit
 {

  ngOnInit(): void
   {
   
  }
  constructor(private fb: FormBuilder, private regUser: UserService, private snackbar: MatSnackBar,private sanitizer:DomSanitizer,private route:Router,private snak:MatSnackBar) {}

  userFile1:any = File;
  userFile2:any = File;
  userform:boolean = true;
  address:boolean = false;
  register:boolean = false;
  count:number = 0 ;


  nextForm(){
    if(this.userform){
      this.userform = false ;
      this.address = true ;
    }else{
      this.address = false ;
      this.register = true ;
    }
  }
  prevbtn(){
    if(this.address){
      this.userform=true;
      this.address = true;
    }else{
      this.address= true;
      this.register= false;
    }
  }

 
  registrationForm = this.fb.group(
    {
    
    firstName: ["", [Validators.required,Validators.minLength(2)]],
    lastName: ["", [Validators.required,Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email, emailValidator()]],
    mobileNo: ["", [Validators.required,Validators.pattern(/^[7869]\d{9,9}$/)]],
    age: ["",[ Validators.required,Validators.min(5)]],
    gender: ["", Validators.required],
    state: ["", Validators.required],
    password: ["",[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]],
    confirmPassword: ["", Validators.required]
  },{
    validator : [ passwordMisMatch ] }
  );



  get firstName(){
    return this.registrationForm.get('firstName');
  }
  get lastName(){
    return this.registrationForm.get('lastName');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  get age(){
    return this.registrationForm.get('age');
  }
  get mobileNo(){
    return this.registrationForm.get('mobileNo');
  }
  get state(){
    return this.registrationForm.get('state');
  }
 
  get password(){
    return this.registrationForm.get('password');
  }
  get confirmPassword(){
    return this.registrationForm.get('confirmPassword');
  }
  get gender(){
    return this.registrationForm.get('gender');
  }
  get profilePic(){
    return this.registrationForm.get('profilePic');
  }


  states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Andaman & Nicober',
    'Bihar',
    'Chhatisagarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Jammu & Kashmir',
    'Karnataka', 
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajsthan',
    'Sikkim',
    'Tamil Nadu',
    'Telengana',
    'Tripura',
    'UttarPradesh',
    'Uttarkhand',
    'West Bengal'
    
  ];
  gen=['Male','Female','  I dnt prefer to answer']
  
  // url:string = "../../assets/defaultprofile.jpg"
  url:string = "../../assets/signuplogin/profile2.png"
  
uploadProfile(file:any){
  if(file.target.files){
    const reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload=(event:any)=>{
      this.url = event.target.result;
    }
  }
  const filedata = file.target.files[0];
  console.log(filedata)
  console.log(file);
}


  onSubmit(){
    this.regUser.registerUser({
      email:this.email?.value,
      password:this.password?.value,
    users:[
      {
        firstName: this.firstName?.value,
        lastName:this.lastName?.value,
        age:this.age?.value,
        mobileNo:this.mobileNo?.value,
        address:this.state?.value,
        gender:this.gender?.value,
        profilePic:this.url}
    ]
    }).subscribe({
      next:(data:any)=> {
       console.log(data)
        Swal.fire('Success',
    'You Have Registered  Succesfully',
    'success'); 
       this.route.navigate(["login"]);
     },error:err=>
     {
       Swal.fire('Sorry','Email address Already reegistred','error') ;
     }
  })
 
  }
 

  openotp:boolean=false;
  isShow:boolean= false;
  showPassword = false;
  showConfirmPassword = false;
  resendTimeout = 0;
    resendInterval: any;
    otpButtonDisabled = false;
  buttonText = 'send otp';  
  otppage()
  {
    // Disable the button for 2 minutes
    this.otpButtonDisabled = true;
    setTimeout(() => {
      this.otpButtonDisabled = false;
    }, 120000); // 2 minutes in milliseconds

    // Set the resend timeout to 2 minutes (120 seconds)
    this.resendTimeout = 120;

    // Start the interval to update the resend message every second
    this.resendInterval = interval(1000)
      .pipe(
        map(() => --this.resendTimeout),
        takeWhile(() => this.resendTimeout >= 0)
      )
      .subscribe(() => {
        // Do something with the updated resendTimeout value
      });
    this.buttonText = 'resend otp ...'; 
    this.snak.open(
      "OTP has been sent succesfully", "Ok",{
        duration:5000,
      });
    localStorage.setItem('emailStorage',this.registrationForm.get("email")?.value+"");
    this.regUser.generateotp(localStorage.getItem("emailStorage")).subscribe(
      (data:any)=>{
 
      console.log(data)
    })

    this.openotp=true;

  }



  formatTime(time: number) {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;


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


  showNext:boolean=false;
  resultotp:any
  onverifyotp()
  {
    localStorage.setItem('otpStorage',this.otpsubmit.get("one")?.value+""+this.otpsubmit.get("two")?.value+""+
    this.otpsubmit.get("three")?.value+""+this.otpsubmit.get("four")?.value+"");
    console.log(localStorage.getItem("otpStorage"));
    this.regUser.checkOtp(localStorage.getItem("otpStorage")).subscribe
(data=>{
     this.resultotp=data
    //  alert(this.resultotp);
       console.log(this.resultotp)
       if(localStorage.getItem("otpStorage")==this.resultotp)
{       
Swal.fire('Success',
    'Otp is verified',
    'success'); 

       this.openotp=false;
       this.showNext=true;
 
      }

       else{
        Swal.fire('Sorry',
        'OTP is not correct !TRY AGAIN',
        'error'); 

       }
      
      
      }
     
  )
  }

 
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


}


  

