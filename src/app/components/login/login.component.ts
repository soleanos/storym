import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private nextPage: string;
  private email: string;
  private password: string;

  constructor(private authService: AuthService, private router: Router
    , private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const nextPage = this.route.snapshot.paramMap.get('nextPage');
    if (nextPage) {
      this.nextPage = nextPage;
    } else {
      this.nextPage = 'author';
    }
  }

  signInWithTwitter() {
    this.authService.signInWithTwitter()
    .then((res) => {
      this.userService.setUserAccount(res.user);
      this.router.navigateByUrl('/home/' + this.nextPage + '/');
    }).catch((err) => console.log(err));
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook()
    .then((res) => {
      console.log(res);
      this.userService.setUserAccount(res.user);
      this.router.navigateByUrl('/home/' + this.nextPage + '/');
      }).catch((err) => console.log(err));
  }


  signInWithGoogle() {
    this.authService.signInWithGoogle()
    .then((res) => {
      this.userService.setUserAccount(res.user);
      this.router.navigateByUrl('/home/' + this.nextPage + '/');
      }).catch((err) => console.log(err));
  }

  signInWithGithub() {
    this.authService.signInWithGithub()
    .then((res) => {
        this.userService.setUserAccount(res.user);
        this.router.navigateByUrl('/home/' + this.nextPage + '/');
      }).catch((err) => console.log(err));
  }

  signInWithEmail() {
    if (this.email && this.password ) {
      this.authService.signInWithMail(this.email, this.password)
      .then((res) => {
          this.userService.setUserAccount(res.user);
          this.router.navigateByUrl('/home/' + this.nextPage + '/');
        }).catch((err) => alert(err.message));
    } else {
      alert('Veuillez saisir vos identifiants');
    }
  }

  goToRegistration = function () {
    this.router.navigateByUrl('/register');
  };


}
