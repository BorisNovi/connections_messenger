import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisterCredentials } from '../models/registration-credentials.model';

@Injectable({
  providedIn: 'root'
})
export class ApiRegistrationService {
  private baseUrl = 'https://tasks.app.rs.school/';
  private headers = new HttpHeaders({
    Accept: 'application/json'
  });

  constructor(private http: HttpClient) { }

  registerUser(credentials: IRegisterCredentials): Observable<void> {
    const dataUrl = `${this.baseUrl}angular/registration`;
    return this.http.post<void>(dataUrl, credentials, { headers: this.headers });
  }
}
