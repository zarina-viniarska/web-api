import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  private courseUrl = 'https://localhost:5000/api/Course/get-all';
  private courseByCategoryIdUrl = "https://localhost:5000/api/Course/get-by-category-id";

  getCourses(): Observable<any> {
    return this.http.get(this.courseUrl)
    .pipe(
      tap(_ => console.log('fetched courses')),
      catchError(this.handleError<Course[]>('getCourses', []))
    );
  }

  getCoursesByCategory(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(this.courseByCategoryIdUrl, { params })
    .pipe(
      tap(_ => console.log('fetched courses by category')),
      catchError(this.handleError<Course[]>('getCoursesByCategory', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
