import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsBlockComponent } from './search-results-block.component';

describe('SearchResultsBlockComponent', () => {
  let component: SearchResultsBlockComponent;
  let fixture: ComponentFixture<SearchResultsBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsBlockComponent]
    });
    fixture = TestBed.createComponent(SearchResultsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
