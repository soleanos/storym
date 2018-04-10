import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

import { MessageService } from './message.service';

import { Story } from '../model/Story';


export interface User {
    email?: String;
    id?: String;
    firstName?: String;
    lastName?: String;
    displayName?: String;
    photoURL?: String;
    provider?: String;
    dateCreated?: String;
    admin?: Boolean;
    providers?: any;
    exist: Boolean;
}

export interface NewUserData {
    uid?: String;
    firstName?: String;
    lastName?: String;
    email?: String;
    photoURL?: String;
    displayName?: String;
    dateCreated?: String;
}

@Injectable()

export class UserService {
    users: Observable<User[]>;
    user: Observable<User>;

    stories: Observable<any[]>;
    story: Observable<Story>;

    private userCollection: AngularFirestoreCollection<User>;
    private storyDoc: AngularFirestoreDocument<User>;

    currentUser: ReplaySubject<any> = new ReplaySubject(1);

    constructor(private messageService: MessageService,
        private db: AngularFirestore) {
        this.initialize();
    }

    private initialize(): void {
        this.user = new Observable<User>();
        this.userCollection = this.db.collection<User>('User');
    }

    //   Get the firebase reference of the story
    getUserDoc(id: string): AngularFirestoreDocument<User> {
        return this.db.doc<User>('User/' + id);
    }

    /** Get a story by ID  */
    getUser(id: string): Observable<any> {
    this.user =  this.getUserDoc(id).snapshotChanges().map(
        user => {
            if (user.payload.exists) {
                const data = user.payload.data() as User;
                data.id = user.payload.id;
                data.exist = true;
                return data;
            }else {
                const data: User = {exist: false};
                return data;
            }
        });
        return this.user.pipe(
            tap(_ => this.log(`fetched user id=${id}`)),
            catchError(this.handleError<User>(`User : id=${id}`))
        );
  }

    loadCurrentUser(authData: any) {
        this.getUser(authData.uid).subscribe((usrData: any) => {
            this.currentUser.next(usrData);
        });
        return this.currentUser;
    }

    setUserAccount(authData: any) {
        const providerData = authData.providerData; // [0];
        const userData: any = {
            id: authData.uid
            // , email: authData.email
            // , lastLogin: moment().format()
            , photoURL: authData.photoURL || 'http://simpleicon.com/wp-content/uploads/user1.png'
            , displayName: authData.displayName
        };

        const usr = this.getUser(authData.uid);
        const usr$ = usr.subscribe((user: any) => {
            if (!user.exist || !user.dateCreated) {
                userData.dateCreated = moment().format();
                userData.levelAccount = 1;
                console.log("cration")
                const usrDoc = this.getUserDoc(authData.uid).set(userData);
            }
            usr$.unsubscribe();
        });
    }

    updateUserAccount(authData: any) {
        const userData: any = {
            id: authData.uid
            , email: authData.email
            , photoURL: authData.photoURL || 'http://simpleicon.com/wp-content/uploads/user1.png'
            , displayName: authData.displayName
        };

        if (authData.firstName) {
            userData.firstName = authData.firstName;
        }
        if (authData.lastName) {
            userData.lastName = authData.lastName;
        }

        const usr = this.getUser(authData.uid);
        const usr$ = usr.subscribe((user: any) => {
            if (user.exist && user.dateCreated) {
                userData.levelAccount = user.levelAccount;
                // userData.lastLogin = user.lastLogin;

                return this.getUserDoc(authData.uid).update(userData);
            }
            usr$.unsubscribe();
        });
    }

    // setUserLastLogin(authData: any) {
    //     const providerData = authData.providerData; // [0];

    //     const usr = this.getUser(authData.uid);
    //     const usr$ = usr.subscribe((user: any) => {
 
    //         if (user.exist || user.dateCreated) {
  
    //             const usrDoc = this.getUserDoc(authData.uid).set({});
    //         }
           
    //         usr$.unsubscribe();
    //     });
    // }

  //////// Gestion loggin error //////////

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('StoryService: ' + message);
  }



}