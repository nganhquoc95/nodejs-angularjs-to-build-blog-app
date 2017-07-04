import { TestBed, inject } from '@angular/core/testing';

import { AdminArticleService } from './article.service';

describe('AdminArticleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminArticleService]
    });
  });

  it('should ...', inject([AdminArticleService], (service: AdminArticleService) => {
    expect(service).toBeTruthy();
  }));
});
