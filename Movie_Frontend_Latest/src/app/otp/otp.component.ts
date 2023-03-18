import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../service/user.service';
import { SignUPComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit
{
  userform:boolean=false;
  constructor(private fb: FormBuilder,private regUser: UserService,private route:Router){}



  message:boolean=true;
  // @Output() event=new EventEmitter<boolean>()

  ngOnInit(): void {
   this.on();
  }


//   sendvalur(){
// this.event.emit(this.userform)
//   }
  
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



    resultotp:any
    on()
    {
      localStorage.setItem('otpStorage',this.otpsubmit.get("one")?.value+""+this.otpsubmit.get("two")?.value+""+
      this.otpsubmit.get("three")?.value+""+this.otpsubmit.get("four")?.value+"");
      console.log(localStorage.getItem("otpStorage"));
      this.regUser.checkOtp(localStorage.getItem("otpStorage")).subscribe
(data=>{
       this.resultotp=data
       alert(this.resultotp);
         console.log(this.resultotp)
         if(localStorage.getItem("otpStorage")==this.resultotp)
  {       
 Swal.fire('Success',
      'Otp registered',
      'success'); 
      // this.regUser.registrainCheck(); //true
      // this.regUser.userform=false;
      // this.event.emit(this.userform);
         this.route.navigate(["signup"]);
    
        }

         else{
          Swal.fire('Sorry',
          'Otp not verified',
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
