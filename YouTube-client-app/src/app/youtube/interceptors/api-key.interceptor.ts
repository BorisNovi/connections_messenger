import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiKey = 'AIzaSyD5ttr2lY939Ay2pavuSYygFZ_1dFVbfHg';
    const modifiedParams = new HttpParams({ fromString: request.params.toString() }).set('key', apiKey);
    const modifiedRequest = request.clone({ params: modifiedParams });
    return next.handle(modifiedRequest);
  }
}
