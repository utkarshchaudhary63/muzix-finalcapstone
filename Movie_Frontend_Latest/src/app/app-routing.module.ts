import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthenGuard } from './guard/authen.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LogInComponent } from './log-in/log-in.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchDashboardComponent } from './search-dashboard/search-dashboard.component';
import { SignUPComponent } from './sign-up/sign-up.component';
import { LogoutGuard } from './guard/logout.guard';


import { PlayComponent } from './play/play.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { MultiusersComponent } from './multiusers/multiusers.component';
import { AdduserComponent } from './adduser/adduser.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { OtpComponent } from './otp/otp.component';


const routes: Routes = [

  {path:'', component:LandingPageComponent, pathMatch:"full"},
  {path:"LandingPage",component:LandingPageComponent},
 
  {path:"signup", component: SignUPComponent},{path:"otp",component:OtpComponent},
  {path:"profile",component:ProfileComponent,canActivate:[AuthenGuard],canDeactivate:[LogoutGuard]},
  {path:"sub",component:SubscriptionComponent,canActivate:[AuthenGuard],canDeactivate:[LogoutGuard]},
  {path:"updateuser",component:UserUpdateComponent,canActivate:[AuthenGuard],canDeactivate:[LogoutGuard]},
  {path:"login", component: LogInComponent},
  {path:"update",component:UserUpdateComponent},
  {path:"users", component: MultiusersComponent,canActivate:[AuthenGuard]},
  {path:"adduser", component: AdduserComponent,canActivate:[AuthenGuard]},
  {path:"forgetpassword", component: ForgetpasswordComponent},
  {path:"Recommended", component: RecommendationComponent,canActivate:[AuthenGuard],canDeactivate:[LogoutGuard]},
  {path:"dashboard",component:DashboardComponent,canActivate:[AuthenGuard],canDeactivate:[LogoutGuard]},
  {path:"search",component:SearchDashboardComponent,canActivate:[AuthenGuard],canDeactivate:[LogoutGuard]},
  {path:"contact", component: ContactUsComponent},
  {path:"fav",component:FavouriteComponent,canActivate:[AuthenGuard],canDeactivate:[LogoutGuard]},
  {path: "play/:id", component: PlayComponent,canActivate:[AuthenGuard]},
  {path:"",redirectTo:"LandingPage",pathMatch:"full"},
  {path:"**", component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
