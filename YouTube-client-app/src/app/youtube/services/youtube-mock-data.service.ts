import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SearchResponseModel } from '../models/search/search-response.model';
import { SearchItemModel } from '../models/search/search-item.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeMockDataService {
  constructor(private http: HttpClient) {
  }

  getMockedData(): Observable<SearchResponseModel> {
    const dataUrl = '../../../assets/mock_data/search-results.json';
    return this.http.get<SearchResponseModel>(dataUrl);
  }

  getMockedDataById(id: string): Observable<SearchItemModel[]> {
    const dataUrl = '../../../assets/mock_data/search-results.json';
    return this.http.get<SearchResponseModel>(dataUrl).pipe(
      map((response) => response.items.filter((item) => item.id === id))
    );
  }
}
