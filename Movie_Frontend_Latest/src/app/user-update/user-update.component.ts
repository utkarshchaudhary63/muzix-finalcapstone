import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit 

{
  constructor(private fb: FormBuilder, private regUser: UserService,private route:Router) {}
  responsedata:any;

  ngOnInit(): void
   {
  this.regUser.getusers(localStorage.getItem('formdata')).subscribe(data=>{
this.responsedata=data;
console.log
  })
  }


  userFile1:any = File;
  userFile2:any = File;
  userform:boolean = true;
  address:boolean = false;
  register:boolean = false;
  count:number = 0 ;
  user:any=localStorage.getItem('user');

  nextForm(){
    if(this.userform){
      this.userform = false ;
      this.address = true ;
      // this.count++ ;
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
    
    firstName: ["", [Validators.minLength(2)]],
    lastName: ["", [Validators.minLength(2)]],
    mobileNo: ["", [Validators.pattern(/^[7869]\d{9,9}$/)]],
    age: ["",[ Validators.min(5)]],
    gender: [""],
    state: [""],
    }
  );



  get firstName(){
    return this.registrationForm.get('firstName');
  }
  get lastName(){
    return this.registrationForm.get('lastName');
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
    'Hariyana',
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
  gen=['Male','Female','I dnt prefer to answer']
  
  url:string = "../../assets/defaultprofile.jpg"
  
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
    this.regUser.updateuser({
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
       
        
    },this.user).subscribe({
      next:(data:any)=> {
       console.log(data)
        Swal.fire('Success',
    'You Have updated user  Succesfully',
    'success');
      
       this.route.navigate(["profile"]);

     }
  })
  }









  // onSubmit()
  // {
   


  // }
 




}
