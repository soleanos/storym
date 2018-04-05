import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-registration',

  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private email: string;
  private password: string;
  private displayName: string;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  register() {
    if (this.email && this.password && this.displayName) {
      this.authService.registerUser(this.email, this.password)
      .then((user: firebase.User) => {
          user.updateProfile({displayName : this.displayName, photoURL : user.photoURL}).then(() => {
            this.router.navigateByUrl('/home');
          }).catch((err) => console.log(err));
          // this.authService.sendConfirmationMail(this.email);
        })
      .catch((err) => console.log(err));
    }else {
      alert("Veuillez saisir les données attendues");
    }
  }

}
