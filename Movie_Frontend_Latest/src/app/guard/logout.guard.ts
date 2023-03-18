import { Injectable } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteService } from '../service/route.service';
import { UserService } from '../service/user.service';


@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanDeactivate<DashboardComponent> 
{ 
  constructor(private authSer:UserService,private rout:RouteService,private route:Router){}
  
canDeactivate(): any {
  if (this.authSer.isDeactivate == true) {
    this.authSer.isDeactivate = false;

    return new Promise((resolve) => {
      Swal.fire({
        title: 'Are you sure you want to exit?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, exit!',
        cancelButtonText: 'No, stay.',
      }).then((result) => {
        if (result.isConfirmed) 
        {
          
          resolve(true); // User confirmed, allow deactivation
        } else {
          this.authSer.isLoggedIn=true;
          resolve(false); // User canceled, prevent deactivation
        }
      });
    });
  }

  return true;
}}