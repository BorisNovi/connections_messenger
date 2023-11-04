import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResponseModel } from '../models/search/search-response.model';

@Injectable({
  providedIn: 'root'
})
export class ForMockedDataService {
  constructor(private http: HttpClient) {
  }

  getMockedData(): Observable<SearchResponseModel> {
    const dataUrl = '../../../assets/mock_data/search-results.json';
    return this.http.get<SearchResponseModel>(dataUrl);
  }
}
