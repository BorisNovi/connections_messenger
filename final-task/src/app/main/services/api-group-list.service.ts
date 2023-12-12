import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalService } from 'src/app/core/services/local.service';
import { IGroupListResponse } from '../models/group-list-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiGroupListService {
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

  getGroupList(): Observable<IGroupListResponse> {
    const headers = this.createHeaders();
    const dataUrl = `${this.baseUrl}angular/groups/list`;
    return this.http.get<IGroupListResponse>(dataUrl, { headers });
  }

  createGroup(name: string): Observable<{ groupID: string }> {
    const headers = this.createHeaders();
    const dataUrl = `${this.baseUrl}angular/groups/create`;
    const body = { name };
    return this.http.post<{ groupID: string }>(dataUrl, body, { headers });
  }

  deleteGroup(groupID: string): Observable<void> {
    const headers = this.createHeaders();
    const dataUrl = `${this.baseUrl}angular/groups/delete?groupID=${groupID}`;
    return this.http.delete<void>(dataUrl, { headers });
  }
}
