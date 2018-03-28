
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
    sliceCollection: AngularFirestoreCollection<Slice>;
    sliceDoc: AngularFirestoreDocument<Slice>;
    choiceCollection: AngularFirestoreCollection<Choice>;

    storyCollection: AngularFirestoreCollection<Story>;
    storyDoc: AngularFirestoreDocument<Story>;

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
  getSlicesOfStory(storyId: string): any {
    this.storyDoc = this.storyService.getStoryDoc(storyId);
    this.sliceCollection =  this.storyDoc.collection<Slice>('Slice');

    this.slices = this.sliceCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Slice;
          data.id = a.payload.doc.id;
          console.log(data);
          return data;
      });
    });

    console.log(this.slices);
    return this.slices.pipe(
      tap(stories => this.log(`fetched stories`)),
      catchError(this.handleError('getStories', []))
    );
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
  return Observable.fromPromise(this.sliceCollection.add(slice))
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
  return Observable.fromPromise(this.sliceCollection.doc(slice.id).update(slice)).pipe(
    tap(_ => this.log(`updated story id=${slice.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}

  // /** GET slices from the server */
  // getSlices (): Observable<Slice[]> {
  //   return this.http.get<Slice[]>(this.slicesUrl)
  //     .pipe(
  //       tap(slices => this.log(`fetched slices`)),
  //       catchError(this.handleError('getSlices', []))
  //     );
  // }

  // /** GET slice by title. Return `undefined` when title not found */
  // getSliceNo404<Data>(title: number): Observable<Slice> {
  //   const url = `${this.slicesUrl}/?title=${title}`;
  //   return this.http.get<Slice[]>(url)
  //     .pipe(
  //       map(slices => slices[0]), // returns a {0|1} element array
  //       tap(h => {
  //         const outcome = h ? `fetched` : `dtitle not find`;
  //         this.log(`${outcome} slice title=${title}`);
  //       }),
  //       catchError(this.handleError<Slice>(`getSlice title=${title}`))
  //     );
  // }

  // /** GET hero by title. Will 404 if title not found */
  // getSlice(title: number): Observable<Slice> {
  //   const url = `${this.slicesUrl}/${title}`;
  //   return this.http.get<Slice>(url).pipe(
  //     tap(_ => this.log(`fetched hero title=${title}`)),
  //     catchError(this.handleError<Slice>(`getSlice title=${title}`))
  //   );
  // }

  // /* GET slices whose story contains search term */
  // searchSlices(term: number): Observable<Slice[]> {
  //   if (!term) {
  //     // if not search term, return empty hero array.
  //     return of([]);
  //   }
  //   return this.http.get<Slice[]>(`api/slices/?story=${term}`).pipe(
  //     tap(_ => this.log(`found slices matching "${term}"`)),
  //     catchError(this.handleError<Slice[]>('searchSlices', []))
  //   );
  // }

  // /* GET slices whose rank contains search term */
  // searchSlicesByRank(term: number): Observable<Slice[]> {
  //   if (!term) {
  //     // if not search term, return empty hero array.
  //     return of([]);
  //   }
  //   return this.http.get<Slice[]>(`api/slices/?level=${term}`).pipe(
  //     tap(_ => this.log(`found slices matching "${term}"`)),
  //     catchError(this.handleError<Slice[]>('searchSlices', []))
  //   );
  // }
  // //////// Save methods //////////

  // /** POST: add a new hero to the server */
  // addSlice (slice: Slice): Observable<Slice> {
  //   return this.http.post<Slice>(this.slicesUrl, slice, httpOptions).pipe(
  //     tap((_: Slice) => this.log(`added slice w/ title=${slice.title}`)),
  //     catchError(this.handleError<Slice>('addSlice'))
  //   );
  // }

  // /** DELETE: delete the hero from the server */
  // deleteSlice (slice: Slice | number): Observable<Slice> {
  //   const title = typeof slice === 'number' ? slice : slice.title;
  //   const url = `${this.slicesUrl}/${title}`;

  //   return this.http.delete<Slice>(url, httpOptions).pipe(
  //     tap(_ => this.log(`deleted slice title=${title}`)),
  //     catchError(this.handleError<Slice>('deleteSlice'))
  //   );
  // }

  // /** PUT: update the hero on the server */
  // updateSlice (slice: Slice): Observable<any> {
  //   return this.http.put(this.slicesUrl, slice, httpOptions).pipe(
  //     tap(_ => this.log(`updated hero title=${slice.title}`)),
  //     catchError(this.handleError<any>('updateSlice'))
  //   );
  // }

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
