import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthrnticateService } from '../service/authrnticate.service';
import { RouteService } from '../service/route.service';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenGuard implements CanActivate {
 
  constructor(private authSer:UserService,private rout:RouteService,private route:Router){}
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
     {
     
          if(!this.authSer.isLoggedIn)
          {
             this.rout.tologinPage();
             return false;
          }
        return true;
  }
    }
    
  