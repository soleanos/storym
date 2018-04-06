import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase/app';
import { User } from 'firebase/app';


@Injectable()
export class AuthService {
    private auth: Observable<firebase.User>;
    public authenticated: Observable<boolean>;
    public uid: Observable<string>;
    private error: any;
    private currentUser: Observable<User>;

    constructor(private af: AngularFireAuth, private router: Router) {
      this.auth = af.authState;
      this.authenticated = this.auth.map( user => !!user && !user.isAnonymous);
      this.uid = this.auth.map(user => user.uid);
    }

    public getAuth(): Observable<firebase.User> {
      return this.auth;
    }

    private signIn(provider: firebase.auth.AuthProvider): any {
      return this.af.auth.signInWithPopup(provider);
        // .catch(error => this.logger.error('ERROR @ AuthService#signIn() :', error));
    }

    public signInAnonymously(): any {
      return this.af.auth.signInAnonymously();
        // .catch(error => this.logger.error('ERROR @ AuthService#signInAnonymously() :', error));
    }

    public signInWithGithub(): any {
      return this.signIn(new firebase.auth.GithubAuthProvider());
    }

    public signInWithGoogle(): any {
      return this.signIn(new firebase.auth.GoogleAuthProvider());
    }

    public signInWithTwitter(): any {
      return this.signIn(new firebase.auth.TwitterAuthProvider());
    }

    public signInWithFacebook(): any {
      return this.signIn(new firebase.auth.FacebookAuthProvider());
    }

    public signOut= (): any => {
      this.af.auth.signOut();
      this.router.navigateByUrl('/login');
  }

   public signInWithMail(email, password) {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }

  registerUser(email, password) {
    return this.af.auth.createUserWithEmailAndPassword(email, password).then((user: firebase.User) => {
      return user;
    }).catch((error: any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
        }
      });
  }

  sendConfirmationMail(email) {
    return this.af.auth.sendSignInLinkToEmail(email, {url: 'www.storym.io'}).then((mail) => {
      console.log(mail);
    }).catch((error: any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
        }
      });
  }

  resetPassword(email) {

  }

  verifyrResetCode(email) {

  }

}
