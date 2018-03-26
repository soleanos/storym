

import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/fromPromise';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
import { Injectable } from '@angular/core';
import { Story } from './story';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

@Injectable()
export class StoryService {
  private storiesUrl = 'api/stories';
  stories: Observable<any[]>;

  private storyCollection: AngularFirestoreCollection<Story>;
  private story: AngularFirestoreDocument<Story>;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private firebase: AngularFireDatabase,
    private db: AngularFirestore
   ) {
      this.storyCollection = db.collection<Story>('Story');
      this.stories = this.storyCollection.snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Story;
            data.id = a.payload.doc.id;
          return data;
        });
      });

    }


/** GET stories from the server */
getStories (): Observable<any[]> {
  return this.stories
    .pipe(
      tap(stories => this.log(`fetched stories`)),
      catchError(this.handleError('getStories', []))
    );
}
/** GET story by id. Return `undefined` when id not found */
getStoryNo404<Data>(id: number): Observable<Story> {
  const url = `${this.storiesUrl}/?id=${id}`;
  return this.http.get<Story[]>(url)
    .pipe(
      map(stories => stories[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} story id=${id}`);
      }),
      catchError(this.handleError<Story>(`getHero id=${id}`))
    );
}

/** GET hero by id. Will 404 if id not found */
getStory(id: string): Observable<Story> {
  this.story = this.db.doc<Story>('Story/' + id);

  return this.story.valueChanges().pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Story>(`getHero id=${id}`))
  );
}

// /* GET stories whose name contains search term */
// searchStories(term: string): Observable<Story[]> {
//   if (!term.trim()) {
//     // if not search term, return empty hero array.
//     return of([]);
//   }
  
//   return  Observable.fromPromise(this.db.collection('Story').where("title", "==", term))
//     tap(_ => this.log(`found stories matching "${term}"`)),
//     catchError(this.handleError<Story[]>('searchStories', []))
//   );
// }

//////// Save methods //////////

/** POST: add a new hero to the server */
addStory (story: Story): Observable<any> {
  story.id = this.db.createId();
  return  Observable.fromPromise(this.storyCollection.add(story))
  .pipe(
    tap((_: any) => this.log(`added story w/ id=${story.id}`)),
    catchError(this.handleError<Story>('addHero'))
  );
}

/** DELETE: delete the hero from the server */
deleteStory (story: Story | string): Observable<any> {
  const id = typeof story === 'string' ? story : story.id;
 
  return  Observable.fromPromise(this.storyCollection.doc(id).delete()).pipe(
    tap(_ => this.log(`deleted story id=${id}`)),
    catchError(this.handleError<Story>('deleteHero'))
  );
}

/** PUT: update the hero on the server */
updateStory (story: Story ): Observable<any> {
  return Observable.fromPromise(this.storyCollection.doc(story.id).update(story)).pipe(
    tap(_ => this.log(`updated hero id=${story.id}`)),
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

 /** Log a HeroService message with the MessageService */
 private log(message: string) {
  this.messageService.add('HeroService: ' + message);
}


}
