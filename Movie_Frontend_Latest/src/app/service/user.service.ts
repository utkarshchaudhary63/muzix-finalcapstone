import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Movie } from '../model/Movie';


@Injectable({
  providedIn: 'root'
})
export class UserService 
{
  isLoggedIn:boolean=false;

  isDeactivate:boolean=false;
  isShow:boolean=false;
  
  constructor(private http:HttpClient) { }
  
url:string='https://api.themoviedb.org/3';

  baseUrl="";

  registerUser(userData:any){
   return  this.http.post("http://localhost:5555/movie/api/v1/register",userData);
  }

  getusers(username:any){
    let httpHeaders=new HttpHeaders({
      'Content-Type' : 'application/json', 
      'Authorization' : 'Bearer '+localStorage.getItem('jwttoken')
    });
    let requestOption:any= {headers:httpHeaders}
    return  this.http.get("http://localhost:5555/movie/api/v1/users/"+username,requestOption);
  }
  
  logincheck(formobj:any)
  {
    return this.http.post("http://localhost:5555/user/api/v1//login",formobj) 
  }

  getuser(user:any){
    let httpHeaders=new HttpHeaders({
      'Content-Type' : 'application/json', 
      'Authorization' : 'Bearer '+localStorage.getItem('jwttoken')
    });
    let requestOption:any= {headers:httpHeaders}
    return this.http.get("http://localhost:5555/movie/api/v1/user/"+localStorage.getItem('formdata')+"/"+user,requestOption) 
  }
  adduser(data:any){
    let httpHeaders=new HttpHeaders({
      'Content-Type' : 'application/json', 
      'Authorization' : 'Bearer '+localStorage.getItem('jwttoken')
    });
    let requestOption:any= {headers:httpHeaders}
    console.log(data);
    return this.http.post("http://localhost:5555/movie/api/v1/adduser/"+localStorage.getItem('formdata'),data,requestOption)
  }

  updateuser(userdata:any,user:any){
    console.log(userdata);
    let httpHeaders=new HttpHeaders({
      'Content-Type' : 'application/json', 
      'Authorization' : 'Bearer '+localStorage.getItem('jwttoken')
    });
    let requestOption:any= {headers:httpHeaders}
    let url:any="http://localhost:5555/movie/api/v1/update/"+`${localStorage.getItem('formdata')}/`+user
    
    return this.http.put(url,userdata);
    
  }

  updatepassword(userdata:any){
 
    let url:any="http://localhost:5555/user/api/v1/updatePassword/"+`${localStorage.getItem('updateemail')}`;
    
    return this.http.post(url,userdata);
    
  }
  deleteuser(user:any){
    let httpHeaders=new HttpHeaders({
      'Content-Type' : 'application/json', 
      'Authorization' : 'Bearer '+localStorage.getItem('jwttoken')
    });
    let requestOption:any= {headers:httpHeaders}
    return this.http.delete("http://localhost:5555/movie/api/v1/deleteUser/"+`${localStorage.getItem('formdata')}/`+user,requestOption) 
  }

  getAccount(email:any)
  {
    return this.http.get("http://localhost:5555/movie/api/v1/Account/"+email) ;
  }
  updateuseramount(data:any){
    return this.http.post("http://localhost:5555/movie/api/v1/updateAmount/"+`${localStorage.getItem('formdata')}`,data)
  }
  
  loggedIn(){
    this.isLoggedIn=true;
  }

  
  registrainCheck()
  {
    this.isShow=true;
  }

  deactivateOut(){
this.isDeactivate=true;
  }
  

  checkOtp(otp:any)
  {
    return this.http.get("http://localhost:5555/mail-app/check/"+otp);
  }

  generateotp(emailid:any){
    // let url="http://localhost:5673/mail-app/send-otp/"+email;
    // let url=this.http.post("http://localhost:5673/mail-app/send-otp/receiverEmail/",email);
   
    return this.http.get("http://localhost:5555/mail-app/send-otp?receiverEmail="+emailid);
    

  }

  userform:boolean = true;
  // ----------------------------------------------------------------------




}
