

import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
import { Injectable } from '@angular/core';
import { Story } from './story';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable()
export class StoryService {
  private storiesUrl = 'api/stories';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
   ) { }

// /** GET stories from the server */
// getStories (): Observable<Story[]> {
//   return this.http.get<Story[]>(this.storiesUrl)
//     .pipe(
//       tap(stories => this.log(`fetched stories`)),
//       catchError(this.handleError('getStories', []))
//     );
// }



/** GET stories from the server */
getStories (): Observable<Story[]> {
  return this.http.get<Story[]>(this.storiesUrl)
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
getStory(id: number): Observable<Story> {
  const url = `${this.storiesUrl}/${id}`;
  return this.http.get<Story>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Story>(`getHero id=${id}`))
  );
}

/* GET stories whose name contains search term */
searchStories(term: string): Observable<Story[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Story[]>(`api/stories/?title=${term}`).pipe(
    tap(_ => this.log(`found stories matching "${term}"`)),
    catchError(this.handleError<Story[]>('searchStories', []))
  );
}

//////// Save methods //////////

/** POST: add a new hero to the server */
addStory (story: Story): Observable<Story> {
  return this.http.post<Story>(this.storiesUrl, story, httpOptions).pipe(
    tap((_: Story) => this.log(`added story w/ id=${story.id}`)),
    catchError(this.handleError<Story>('addHero'))
  );
}

/** DELETE: delete the hero from the server */
deleteStory (story: Story | number): Observable<Story> {
  const id = typeof story === 'number' ? story : story.id;
  const url = `${this.storiesUrl}/${id}`;

  return this.http.delete<Story>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted story id=${id}`)),
    catchError(this.handleError<Story>('deleteHero'))
  );
}

/** PUT: update the hero on the server */
updateStory (story: Story): Observable<any> {
  return this.http.put(this.storiesUrl, story, httpOptions).pipe(
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
