import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/fromPromise';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { MessageService } from './message.service';

import { Category } from '../model/Category';
/**
 * Ce service utilise FIREBASE.
 */
@Injectable()
export class CategoryService {

  categories: Observable<any[]>;
  category: Observable<Category>;

  private categoryCollection: AngularFirestoreCollection<Category>;
  private categoryDoc: AngularFirestoreDocument<Category>;

  constructor(
    private messageService: MessageService,
    private db: AngularFirestore
   ) {
      this.category = new Observable<Category>();
    }

  //////// Firebase références  //////////

  /** Get the firebase reference of the Category  */
  getCategoryDoc(id: string): AngularFirestoreDocument<Category> {
    return this.db.doc<Category>('Category/' + id);
  }


  //////// Get methods //////////

  /** Get all stories  */
  getCategories (): Observable<any[]> {
    this.categoryCollection = this.db.collection<Category>('Category');
    this.categories = this.categoryCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Category;
          data.id = a.payload.doc.id;
        return data;
      });
    });
    return this.categories
      .pipe(
        tap(stories => this.log(`fetched Categories`)),
        catchError(this.handleError('getCategories', []))
      );
  }

  /** Get a category by ID  */
  getCategory(id: string): Observable<Category> {
    this.category =  this.getCategoryDoc(id).snapshotChanges().map(
      category => {
        const data = category.payload.data() as Category;
        data.id = category.payload.id;
        return data;
      }
    );
    return this.category.pipe(
      tap(_ => this.log(`fetched category id=${id}`)),
      catchError(this.handleError<Category>(`Category : id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST Add a new category */
  addCategory(category: Category): Observable<any> {
    category.id = this.db.createId();
    return  Observable.fromPromise(this.categoryCollection.add(category))
    .pipe(
      tap((_: any) => this.log(`added Category w/ id=${category.id}`)),
      catchError(this.handleError<Category>('addHero'))
    );
  }

  /** DELETE: delete the category from the server */
  deleteCategory (category: Category | string): Observable<any> {
    const id = typeof category === 'string' ? category : category.id;
    return  Observable.fromPromise(this.categoryCollection.doc(id).delete()).pipe(
      tap(_ => this.log(`deleted category id=${id}`)),
      catchError(this.handleError<Category>('deleteHero'))
    );
  }

  /** PUT: update the category on the server */
  updateCategory (category: Category ): Observable<any> {
    this.categoryCollection = this.db.collection<Category>('Category');
    return Observable.fromPromise(this.categoryCollection.doc(category.id).update(category)).pipe(
      tap(_ => this.log(`updated category id=${category.id}`)),
      catchError(this.handleError<any>('updateCategory'))
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
    this.messageService.add('CategoryService: ' + message);
  }

}
