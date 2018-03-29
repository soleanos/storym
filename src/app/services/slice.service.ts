import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { MessageService } from './message.service';
import { StoryService } from '../services/story.service';

import { Slice } from '../model/Slice';
import { Story } from '../model/Story';
import { Choice } from '../model/Choice';

/**
 * Ce service utilise FIREBASE.
 */
@Injectable()
export class SliceService {

    storiesById: Observable<any[]>;
    slices: Observable<Slice[]>;
    choices: Observable<Choice[]>;

    sliceCollection: AngularFirestoreCollection<Slice>;
    choiceCollection: AngularFirestoreCollection<Choice>;
    storyCollection: AngularFirestoreCollection<Story>;

    storyDoc: AngularFirestoreDocument<Story>;
    sliceDoc: AngularFirestoreDocument<any>;

    constructor(
      private messageService: MessageService,
      private db: AngularFirestore,
      private storyService: StoryService,
    ) {
   }

  //////// Firebase références  //////////

  /** Get the firebase reference of the slice  */
  getSliceDoc(id: string): AngularFirestoreDocument<any> {
    return this.storyDoc.collection<Slice>('/Slice/').doc(id);
  }

  /** Get the firebase reference of the slice collection  */
  getSliceCollection(idStory: string):  AngularFirestoreCollection<Slice> {
    this.storyDoc = this.storyService.getStoryDoc(idStory);
    return this.storyDoc.collection<Slice>('/Slice/');
  }

  //////// Get methods //////////

  /**
   * Get all slices of one story
   * @param storyId
   */
  getSlicesOfStory(storyId: string): Observable<Slice[]> {
    this.storyDoc = this.storyService.getStoryDoc(storyId);
    this.sliceCollection =  this.storyDoc.collection<Slice>('Slice/');

    this.slices = this.sliceCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Slice;
          data.id = a.payload.doc.id;
          return data;
      });
    });

    return this.slices.pipe(
      tap(stories => this.log(`fetched stories`)),
      catchError(this.handleError('getStories', []))
    );
  }

  /** Get all slices  */
  getSlices (): Observable<any[]> {
    return this.slices
  .pipe(
        tap(stories => this.log(`fetched slices`)),
        catchError(this.handleError('getSlices', []))
      );
  }

  /** Get a slice by ID  */
  getSlice(id: string): Observable<Slice> {
    this.sliceDoc = this.db.doc<Slice>('Slice/' + id);

    return this.sliceDoc.valueChanges().pipe(
      tap(_ => this.log(`fetched slice id=${id}`)),
      catchError(this.handleError<Slice>(`getSlice id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST Add a new slice */
  addSlice (slice: Slice): Observable<any> {
    return Observable.fromPromise(this.getSliceCollection(slice.story).doc(slice.id).set(slice))
    .pipe(
      tap((_: any) => this.log(`added slice w/ id=${slice.id}`)),
      catchError(this.handleError<Slice>('addSlice'))
    );
  }

  /** DELETE: delete the story from the server */
  deleteSlice (story: Slice | string): Observable<any> {
    const id = typeof story === 'string' ? story : story.id;
    return  Observable.fromPromise(this.sliceCollection.doc(id).delete()).pipe(
      tap(_ => this.log(`deleted slice id=${id}`)),
      catchError(this.handleError<Slice>('deleteSlice'))
    );
  }

  /** PUT: update the story on the server */
  updateSlice (slice: Slice ): Observable<any> {
    return Observable.fromPromise(this.getSliceCollection(slice.story).doc(slice.id).update(slice)).pipe(
      tap(_ => this.log(`updated slice id=${slice.id}`)),
      catchError(this.handleError<any>('updateSlice'))
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

  /** Log a SliceService message with the MessageService */
  private log(message: string) {
    this.messageService.add('SliceService: ' + message);
  }

}
