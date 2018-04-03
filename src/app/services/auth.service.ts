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



  constructor(private af: AngularFireAuth, private router: Router) {
    this.auth = af.authState;
    this.authenticated = this.auth.map( user => !!user && !user.isAnonymous);
    this.uid = this.auth.map(user => user.uid);
  }

  public getAuth(): Observable<firebase.User> {
    return this.auth;
  }

  private signIn(provider: firebase.auth.AuthProvider): any {
    return this.af.auth.signInWithPopup(provider)
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
    return this.af.auth.signOut();
}

}
