import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/fromPromise';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

import { MessageService } from './message.service';

import { Story } from '../model/Story';
/**
 * Ce service utilise FIREBASE.
 */
@Injectable()
export class StoryService {

  stories: Observable<any[]>;
  story: Observable<Story>;

  private storyCollection: AngularFirestoreCollection<Story>;
  private storyDoc: AngularFirestoreDocument<Story>;

  constructor(
    private messageService: MessageService,
    private db: AngularFirestore
   ) {
      this.story = new Observable<Story>();
    }

  //////// Firebase références  //////////

  /** Get the firebase reference of the story  */
  getStoryDoc(id: string): AngularFirestoreDocument<Story> {
    return this.db.doc<Story>('Story/' + id);
  }


  //////// Get methods //////////

  /** Get all stories  */
  getStories (): Observable<any[]> {
    this.storyCollection = this.db.collection<Story>('Story');
    this.stories = this.storyCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Story;
          data.id = a.payload.doc.id;
        return data;
      });
    });
    return this.stories
      .pipe(
        tap(stories => this.log(`fetched stories`)),
        catchError(this.handleError('getStories', []))
      );
  }

   /** Get all stories of specified id  */
   getStoriesOfAuthor (idAuthor: string): Observable<any[]> {
    this.storyCollection = this.db.collection<Story>('Story',
     clause => clause.where('author', '==', idAuthor));
    this.stories = this.storyCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Story;
          data.id = a.payload.doc.id;
        return data;
      });
    });
    return this.stories
      .pipe(
        tap(stories => this.log(`fetched stories`)),
        catchError(this.handleError('getStories', []))
      );
  }

  /** Get a story by ID  */
  getStory(id: string): Observable<Story> {
    this.story =  this.getStoryDoc(id).snapshotChanges().map(
      story => {
        const data = story.payload.data() as Story;
        data.id = story.payload.id;
        return data;
      }
    );
    return this.story.pipe(
      tap(_ => this.log(`fetched story id=${id}`)),
      catchError(this.handleError<Story>(`Story : id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST Add a new story */
  addStory (story: Story): Observable<any> {
    story.id = this.db.createId();
    return  Observable.fromPromise(this.storyCollection.add(story))
    .pipe(
      tap((_: any) => this.log(`added story w/ id=${story.id}`)),
      catchError(this.handleError<Story>('addHero'))
    );
  }

  /** DELETE: delete the story from the server */
  deleteStory (story: Story | string): Observable<any> {
    const id = typeof story === 'string' ? story : story.id;
    return  Observable.fromPromise(this.storyCollection.doc(id).delete()).pipe(
      tap(_ => this.log(`deleted story id=${id}`)),
      catchError(this.handleError<Story>('deleteHero'))
    );
  }

  /** PUT: update the story on the server */
  updateStory (story: Story ): Observable<any> {
    this.storyCollection = this.db.collection<Story>('Story');
    return Observable.fromPromise(this.storyCollection.doc(story.id).update(story)).pipe(
      tap(_ => this.log(`updated story id=${story.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

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
