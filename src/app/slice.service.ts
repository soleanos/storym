
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
import { Injectable } from '@angular/core';
import { Slice } from './slice';
import { Story } from './Story';
import { Choice } from './Choice';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { StoryService } from './story.service';

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
      private http: HttpClient,
      private messageService: MessageService,
      private db: AngularFirestore,
      private storyService: StoryService,
    ) {
   }

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
          // console.log(data.id);
          return data;
      });
    });

    return this.slices.pipe(
      tap(stories => this.log(`fetched stories`)),
      catchError(this.handleError('getStories', []))
    );
  }

/**
 * Get all choices of one story
 * @param sliceId
 */
 getChoicesOfSlice(sliceId: string): any {
  this.choiceCollection = this.getChoiceCollection(sliceId);

  this.choices = this.choiceCollection.snapshotChanges().map(actions => {
    return actions.map(a => {
       const data = a.payload.doc.data() as Choice;
         data.id = a.payload.doc.id;
         return data;
     });
   });

   return this.choices.pipe(
     tap(stories => this.log(`fetched stories`)),
     catchError(this.handleError('getStories', []))
   );
 }

  /** Get the firebase reference of the slice  */
  getSliceDoc(id: string): AngularFirestoreDocument<any> {
    return this.storyDoc.collection<Slice>('/Slice/').doc(id);
  }

   /** Get the firebase reference of the slice collection  */
   getSliceCollection(idStory: string):  AngularFirestoreCollection<Slice> {
    this.storyDoc = this.storyService.getStoryDoc(idStory);
    return this.storyDoc.collection<Slice>('/Slice/');
  }

  /** Get the firebase reference of the story  */
  getChoiceCollection(sliceId: string): AngularFirestoreCollection<Choice> {
    const sliceDoc: AngularFirestoreDocument<any> = this.getSliceDoc(sliceId);
    return sliceDoc.collection<Choice>('Choice/');
  }

/** Get all slices  */
getSlices (): Observable<any[]> {
  return this.slices
 .pipe(
      tap(stories => this.log(`fetched stories`)),
      catchError(this.handleError('getStories', []))
    );
}

/** Get a slice by ID  */
getSlice(id: string): Observable<Slice> {
  this.sliceDoc = this.db.doc<Slice>('Slice/' + id);

  return this.sliceDoc.valueChanges().pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Slice>(`getHero id=${id}`))
  );
}

//////// Save methods //////////

/** POST Add a new slice */
addSlice (slice: Slice): Observable<any> {
  slice.id = this.db.createId();
  return Observable.fromPromise(this.getSliceCollection(slice.story).add(slice))
  .pipe(
    tap((_: any) => this.log(`added slice w/ id=${slice.id}`)),
    catchError(this.handleError<Slice>('addSlice'))
  );
}

/** DELETE: delete the story from the server */
deleteSlice (story: Slice | string): Observable<any> {
  const id = typeof story === 'string' ? story : story.id;
  return  Observable.fromPromise(this.sliceCollection.doc(id).delete()).pipe(
    tap(_ => this.log(`deleted story id=${id}`)),
    catchError(this.handleError<Slice>('deleteHero'))
  );
}

/** PUT: update the story on the server */
updateSlice (slice: Slice ): Observable<any> {
  return Observable.fromPromise(this.getSliceCollection(slice.story).doc(slice.id).update(slice)).pipe(
    tap(_ => this.log(`updated story id=${slice.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}

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

  // /**
  //  * Get all slices of one story
  //  * @param storyId
  //  */
  // getSlicesByStoryID(storyId: string): any {
  //   const storiesByIdCollection: AngularFirestoreCollection<Slice> =  this.db.collection<Slice>(
  //     'Slice',
  //     clause => clause.where('story', '==', storyId)
  //   );

  //   this.storiesById = storiesByIdCollection.snapshotChanges().map(actions => {
  //     return actions.map(a => {
  //       const data = a.payload.doc.data() as Slice;
  //         data.id = a.payload.doc.id;
  //         console.log(data);
  //       return data;
  //     });
  //   });

  //   return this.storiesById.pipe(
  //     tap(stories => this.log(`fetched stories`)),
  //     catchError(this.handleError('getStories', []))
  //   );
  // }
}
