import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUPComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// -----------------------------------
import {MatTooltipModule} from '@angular/material/tooltip';

import { LayoutModule } from '@angular/cdk/layout';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LogInComponent } from './log-in/log-in.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FooterComponent } from './footer/footer.component';
import { FeaturesComponent } from './features/features.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FrequentQuestComponent } from './frequent-quest/frequent-quest.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NextDirective } from './next.directive';
import { PrevDirective } from './prev.directive';
import { ProfileComponent } from './profile/profile.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SafePipe } from './safe.pipe';
import { SearchDashboardComponent } from './search-dashboard/search-dashboard.component';

import {MatMenuModule} from '@angular/material/menu';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { PlayComponent } from './play/play.component';

import { RecommendationComponent } from './recommendation/recommendation.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { MultiusersComponent } from './multiusers/multiusers.component';
import { AdduserComponent } from './adduser/adduser.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResponsiveDirective } from './directives/responsive.directive';
import { OtpComponent } from './otp/otp.component';
import { OtpDirective } from './directives/otp.directive';

@NgModule({
  declarations: [
    AppComponent,
    SignUPComponent,
    LogInComponent,
    DashboardComponent,LandingPageComponent,FooterComponent,FeaturesComponent, PageNotFoundComponent,
    HeaderComponent,
    
    NavBarComponent,
    FrequentQuestComponent,
    ContactUsComponent,
    NextDirective,
    PrevDirective,
    ProfileComponent,
    MovieDetailComponent,
    SafePipe,
    SearchDashboardComponent,
    FooterComponent,
    FeaturesComponent,
    DashboardComponent,
    PlayComponent,
  
    RecommendationComponent,
    FavouriteComponent,
    MultiusersComponent,
    AdduserComponent,
    SubscriptionComponent,
    UserUpdateComponent,
    ForgetpasswordComponent,
    ResponsiveDirective,
    OtpComponent,
    OtpDirective
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,MatDatepickerModule,MatTooltipModule,
    BrowserAnimationsModule,LayoutModule,MatToolbarModule,MatFormFieldModule,MatExpansionModule,HttpClientModule,
    MatSnackBarModule ,FormsModule,ReactiveFormsModule,MatCardModule,MatRadioModule,MatSelectModule,MatInputModule,
    MatListModule,MatSidenavModule,MatIconModule,MatButtonModule,MatCheckboxModule,MatMenuModule,ConfirmationPopoverModule.forRoot({
      confirmButtonType:"danger"
    })

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
