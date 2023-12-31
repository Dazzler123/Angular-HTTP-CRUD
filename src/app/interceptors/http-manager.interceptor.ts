import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize} from "rxjs/operators";
import {LoadingService} from "../services/loading.service";

@Injectable()
export class HttpManagerInterceptor implements HttpInterceptor {

  constructor(private service:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.service.loading.next(true);
    return next.handle(request).pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
      }),
      finalize(()=> {
        this.service.loading.next(false);
      })
    );
  }
}
