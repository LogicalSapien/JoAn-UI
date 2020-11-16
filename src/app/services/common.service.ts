import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(this.apiUrl + url, this.getHeaderOptions())
      .pipe(catchError(this.handleError<any>(url)));
  }

  post(url: string, postData): Observable<any> {
    return this.http.post(this.apiUrl + url, postData, this.getHeaderOptions())
      .pipe(catchError(this.handleError<any>(url)));
  }

  getHeaderOptions() {
    const headers = {
      'Content-Type' : 'application/json',
      'Cache-Control' : 'no-cache'
    };

    const options = {
      headers: headers
    };

    return options;
  }

  handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      console.log(error);
      return throwError([error]);
    }
  }
}
