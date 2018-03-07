import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertComponent } from './_directives/alert/alert.component';
import { AlbumComponent } from './components/album/album.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

import { YoutubeApiService } from './services/YouTube/youtube-api.service';
import { SavedMediaService } from './services/Saved-Media/saved-media.service';
import { SavedProfileService } from './services/profile-information/saved-profile.service';
import { SaveUserService } from './services/User/save-user.service';
import { AlertService } from './services/alert/alert.service';
import { ValidateService } from './services/validation/validate.service';
import { AuthenticationService } from './services/authentication/authentication.service';

import { YoutubePipe } from './pipes/youtube.pipe';

import {DndModule} from 'ng2-dnd';


const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'album', component: AlbumComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadComponent,
    ProfileComponent,
    ContactUsComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    FooterComponent,
    YoutubePipe,
    AlbumComponent,
    EditProfileComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes),
    DndModule.forRoot(),
    FlashMessagesModule.forRoot()
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    SaveUserService,
    YoutubeApiService,
    SavedMediaService,
    SavedProfileService,
    AlertService,
    ValidateService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
