import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SaveUserService } from '../../services/User/save-user.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ValidateService } from '../../services/validation/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private saveUserService: SaveUserService,
    private authService: AuthenticationService,
    private validateService: ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    if (!this.validateService.validateLogin(user)) {
      this._flashMessagesService.show('Please fill out all feilds!', { cssClass: 'alert-danger', timeout: 6000 });
    } else {
      // Login user
      this.authService.authenticateUser(user)
      .subscribe(data => {
        if (data.success === false) {
          console.log('Its false');
          this._flashMessagesService.show('User not found!', { cssClass: 'alert-danger', timeout: 6000 });
        } else {
          this.router.navigate(['/home']);
        }
      });
    }
  }

}
