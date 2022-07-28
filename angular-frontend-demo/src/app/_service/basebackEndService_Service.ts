import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseBackendService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor() {
  }

  // tslint:disable-next-line:typedef
  handleError(error: HttpErrorResponse) {
    // json stringify makes the object readable
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(error);
  }
}
