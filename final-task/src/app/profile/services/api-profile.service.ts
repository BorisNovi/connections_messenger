import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LocalService } from 'src/app/core/services/local.service';
import { IProfileResponse } from '../models/profile-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiProfileService {
  private baseUrl = 'https://tasks.app.rs.school/';

  constructor(
    private http: HttpClient,
    private localService: LocalService,
  ) { }

  getProfileData(): Observable<IProfileResponse> {
    const rsUid = this.localService.getData('uid');
    const rsEmail = this.localService.getData('email');
    const token = this.localService.getData('token');

    if (!rsUid || !rsEmail || !token) {
      return throwError(() => new Error('Not all required data is available!'));
    }

    const headers = new HttpHeaders({
      'rs-uid': rsUid,
      'rs-email': rsEmail,
      Authorization: `Bearer ${token}`
    });
    const dataUrl = `${this.baseUrl}angular/profile`;
    return this.http.get<IProfileResponse>(dataUrl, { headers });
  }

  changeProfileData(name: string): Observable<void> {
    const rsUid = this.localService.getData('uid');
    const rsEmail = this.localService.getData('email');
    const token = this.localService.getData('token');

    if (!rsUid || !rsEmail || !token) {
      return throwError(() => new Error('Not all required data is available!'));
    }

    const headers = new HttpHeaders({
      'rs-uid': rsUid,
      'rs-email': rsEmail,
      Authorization: `Bearer ${token}`
    });
    const dataUrl = `${this.baseUrl}angular/profile`;
    const body = { name };
    return this.http.put<void>(dataUrl, body, { headers });
  }
}
