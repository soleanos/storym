import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email: string;
  private password: string;

  constructor(private authService: AuthService, private router: Router
    , private userService: UserService) {
  }

  signInWithTwitter() {
    this.authService.signInWithTwitter()
    .then((res) => {
      this.userService.setUserAccount(res.user);
      this.router.navigateByUrl('/home');
    }).catch((err) => console.log(err));
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook()
    .then((res) => {
      console.log(res);
      this.userService.setUserAccount(res.user);
      this.router.navigateByUrl('/home');
      }).catch((err) => console.log(err));
  }


  signInWithGoogle() {
    this.authService.signInWithGoogle()
    .then((res) => {
      this.userService.setUserAccount(res.user);
      this.router.navigateByUrl('/home');
      }).catch((err) => console.log(err));
  }

  signInWithGithub() {
    this.authService.signInWithGithub()
    .then((res) => {
        this.userService.setUserAccount(res.user);
        this.router.navigateByUrl('/home');
      }).catch((err) => console.log(err));
  }

  signInWithEmail() {
    if (this.email && this.password ) {
      this.authService.signInWithMail(this.email, this.password)
      .then((res) => {
          this.userService.setUserAccount(res.user);
          this.router.navigateByUrl('/home');
        }).catch((err) => alert(err.message));
    }else {
      alert("Veuillez saisir vos identifiants");
    }
  }

  goToRegistration= function () {
    this.router.navigateByUrl('/register');
  };

  ngOnInit() {
  }

}
