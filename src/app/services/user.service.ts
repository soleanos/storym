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

export interface User {
    email: String;
    uid?: String;
    $key?: String;
    firstName?: String;
    lastName?: String;
    displayName?: String;
    photoURL?: String;
    provider?: String;
    dateCreated?: String;
    admin?: Boolean;
    providers?: any;
}

export interface NewUserData {
    uid?: String;
    firstName?: String;
    lastName?: String;
    email: String;
    photoURL?: String;
    displayName?: String;
    dateCreated?: String;
}

@Injectable()

export class UserService {
    
//     users: Observable<User[]>;
//     user: Observable<User>;

//     private userCollection: AngularFirestoreCollection<User>;
//     private storyDoc: AngularFirestoreDocument<User>;

//     constructor(private messageService: MessageService,
//         private db: AngularFirestore) {
//         this.initialize();
//     }

//     private initialize(): void {
//         this.userCollection = this.db.collection<User>('User');
//     }

//     //   Get the firebase reference of the story
//     getUserDoc(id: string): AngularFirestoreDocument<User> {
//         return this.db.doc<User>('Story/' + id);
//     }

//     /** Get a story by ID  */
//     getUser(id: string): Observable<User> {
//     this.user =  this.getUserDoc(id).snapshotChanges().map(
//       story => {
//         const data = story.payload.data() as User;
//         data.id = story.payload.id;
//         return data;
//       }
//     );
//     return this.user.pipe(
//       tap(_ => this.log(`fetched story id=${id}`)),
//       catchError(this.handleError<Story>(`Story : id=${id}`))
//     );
//   }


//     loadCurrentUser(authData: any) {
//         this.getUser(authData.uid).subscribe((usrData: any) => {
//             this.logger.log('set currentUser', usrData);
//             this.currentUser.next(usrData);
//         });
//         return this.currentUser;
//     }

//     makeProviderObj(providerData: Array<any>) {
//         const ret = {};
//         for (const item of providerData) {
//             ret[item.providerId.replace('.com', '')] = item.uid;
//         }
//         console.log('makeProviderObj', ret);
//         return ret;
//     }

//     setUserAccount(authData: any) {
//         this.logger.log('set account', authData);

//         const providerData = authData.auth.providerData; // [0];
//         const userData: any = {
//             uid: authData.uid
//             , email: authData.auth.email
//             // ,providerId: providerData.providerId
//             , lastLogin: moment().format()
//             // ,providerUid: providerData.uid
//             , providers: this.makeProviderObj(authData.auth.providerData)
//             , photoURL: authData.auth.photoURL || 'http://simpleicon.com/wp-content/uploads/user1.png'
//             , displayName: authData.auth.displayName
//         };

//         /* Ended up not needing this, but it's handy to know...
// 		let providerMap:any = {
// 			'2': 'facebook'
// 			,'3': 'google'
// 			,'4': 'firebase'
// 		};*/


//         if (authData.auth.firstName) {
//             userData.firstName = authData.auth.firstName;
//         }
//         if (authData.auth.lastName) {
//             userData.lastName = authData.auth.lastName;
//         }

//         const usr = this.getUser(userData.uid);

//         const usr$ = usr.subscribe((user: any) => {
//             this.logger.log('usr exists?', user.$exists(), usr);
//             if (!user.$exists() || !user.dateCreated) {
//                 this.logger.log('add dateCreated', moment().format());
//                 userData.dateCreated = moment().format();
//                 usr.set(userData);
//             }
//             usr$.unsubscribe();
//         });

//         return usr.update(userData);

    // }
}