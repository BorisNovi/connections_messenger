import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  private createHeaders(): HttpHeaders {
    const rsUid = this.localService.getData('uid');
    const rsEmail = this.localService.getData('email');
    const token = this.localService.getData('token');

    if (!rsUid || !rsEmail || !token) {
      throw new Error('Not all required data is available!');
    }

    return new HttpHeaders({
      'rs-uid': rsUid,
      'rs-email': rsEmail,
      Authorization: `Bearer ${token}`
    });
  }

  getProfileData(): Observable<IProfileResponse> {
    const headers = this.createHeaders();
    const dataUrl = `${this.baseUrl}angular/profile`;
    return this.http.get<IProfileResponse>(dataUrl, { headers });
  }

  changeProfileData(name: string): Observable<void> {
    const headers = this.createHeaders();
    const dataUrl = `${this.baseUrl}angular/profile`;
    const body = { name };
    return this.http.put<void>(dataUrl, body, { headers });
  }

  signoutUser(): Observable<void> {
    const headers = this.createHeaders();
    const dataUrl = `${this.baseUrl}angular/logout`;
    return this.http.delete<void>(dataUrl, { headers });
  }
}
