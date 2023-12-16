import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ISignInCredentials } from '../models/signin-credentials.model';
import { ISignInResponse } from '../models/signin-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiSignInService {
  private baseUrl = environment.baseUrl;
  private headers = new HttpHeaders({
    Accept: 'application/json'
  });

  constructor(private http: HttpClient) { }

  signinUser(credentials: ISignInCredentials): Observable<ISignInResponse> {
    const dataUrl = `${this.baseUrl}angular/login`;
    return this.http.post<ISignInResponse>(dataUrl, credentials, { headers: this.headers });
  }
}
