import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email: string;
  private password: string;

  constructor(private authService: AuthService, private router: Router) {
  }
  
  signInWithTwitter() {
    this.authService.signInWithTwitter()
    .then((res) => {
        this.router.navigate(['home']);
      })
    .catch((err) => console.log(err));
  }


  signInWithFacebook() {
    this.authService.signInWithFacebook()
    .then((res) => {
        this.router.navigate(['home']);
      })
    .catch((err) => console.log(err));
  }


  signInWithGoogle() {
    this.authService.signInWithGoogle()
    .then((res) => {
        this.router.navigate(['home']);
      })
    .catch((err) => console.log(err));
  }

  signInWithGithub() {
    this.authService.signInWithGithub()
    .then((res) => {
        this.router.navigate(['home']);
      })
    .catch((err) => console.log(err));
  }

  signInWithEmail() {
    if (this.email && this.password ) {
    this.authService.signInWithMail(this.email, this.password)
    .then((res) => {
        console.log(res);
        this.router.navigate(['home']);
      })
    .catch((err) => alert(err.message));
    }else{
      alert("Veuillez saisir vos identifiants");
    }
  }


  ngOnInit() {
  }

}
