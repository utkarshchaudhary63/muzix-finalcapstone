import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from '../service/movie.service';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
declare var Razorpay:any
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit

{
  title = 'Razorpay';
  userData:any = {};

  form: any = {}; 
  constructor(private http: HttpClient,private route:Router,
    private orderService:MovieService,private userService:UserService,private snackBar:MatSnackBar) {

  }
  Amount:number=0;
  currentuser:any = localStorage.getItem('formdata')

  ngOnInit(): void 
  
  {
    this.userService.getAccount(this.currentuser).subscribe(data=>{
      console.log(data);
      this.userData = data; 
    
      this.Amount= this.userData.amount ;
    } )
  }


  paymentId: string | undefined;
  error: string | undefined;
  // paymentPlan = null
  
  options = {
    "key": "",
    "amount": "", 
    "currency":"INR",
    "name": "Muzix",
    "description": "Muzix Application",
    "image": "../../assets/logo12.png",
    "order_id":"",
    "handler": function (response: any){
      var event = new CustomEvent("payment.success", 
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );	  
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
    "name": "Rishi",
    "email": "rishi1@gmail.com",
    "contact": "7439329278"
    },
    "notes": {
    "address": "West Bengal"
    },
    "theme": {
    "color": "#3399cc"
    }
    };

    payment(amount:any): void {
      this.paymentId = ''; 
      this.error = ''; 
      const currentUser = localStorage.getItem('formdata')
      console.log(currentUser);
      this.userService.getAccount(currentUser).subscribe( data=>{
        console.log(data);
        this.userData = data;
        
        this.userData.amount= amount;
        
        // this.paymentPlan = amount;
        console.log(this.userData);
        this.orderService.createOrder(this.userData).subscribe(
          data => {
            console.log(this.userData)
            console.log(data)
            this.options.key = 'rzp_test_rEeShHD8vGAvnS';
            this.options.order_id = data.razorpayOrderId;
            this.options.amount = data.applicationFee; //paise
            this.options.prefill.name = this.userData.userName;
            this.options.prefill.email = this.userData.email;
            this.options.prefill.contact = this.userData.mobileNo;
            console.log(this.options)
            var rzp1 = new Razorpay(this.options);
            rzp1.open();
            this.userData
            rzp1.on('payment.failed', function (response:any){    
              console.log(response);
              console.log(response.error.code);    
              console.log(response.error.description);    
              console.log(response.error.source);    
              console.log(response.error.step);    
              console.log(response.error.reason);    
              console.log(response.error.metadata.order_id);    
              console.log(response.error.metadata.payment_id); 
            })
           
          }
          ,
          err => {
            this.error = err.error.message;
            this.snackBar.open('You Payment is UnSuccessFull!!', 'Failure', {
              duration: 5000,
               panelClass: ['mat-toolbar', 'mat-primary'] 
             })
          }
          );
      })
    }
    @HostListener('window:payment.success', ['$event']) 
    onPaymentSuccess(event: any): void {
       console.log(event.detail);
       console.log(event.detail.razorpay_payment_id);
       if(event.detail.razorpay_payment_id !== null){
        console.log(this.userData)
        let updatedPlanForUser = this.userData;
        switch(this.userData.amount) {
          case 149:
            updatedPlanForUser.subscriptionPlan = 'Silver'
            break;
          case 199:
            updatedPlanForUser.subscriptionPlan = 'Gold'
            break;
          case 299:
            updatedPlanForUser.subscriptionPlan = 'Platinum'
            break;
        }
          
       }
       console.log(this.userData);
    }
    updateamount(){
this.userService.updateuseramount(this.userData).subscribe((res:any)=>{
 Swal.fire('Congrats','You are now a Muzix subscribed Member ENJOY','success')
 this.route.navigate(['dashboard'])}
 )
    }

    Unsubscribe(){
      this.userData.amount=0;
      this.userData.subscriptionPlan=null;
      this.userService.updateuseramount(this.userData).subscribe((res:any)=>{
        Swal.fire('OK','Your plan is been deactivated','success')
        this.route.navigate(['dashboard'])}
        )  
    }
}
