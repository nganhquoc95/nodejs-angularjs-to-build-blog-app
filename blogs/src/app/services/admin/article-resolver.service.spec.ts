import { TestBed, inject } from '@angular/core/testing';

import { AdminArticleResolverService } from './article-resolver.service';

describe('AdminArticleResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminArticleResolverService]
    });
  });

  it('should ...', inject([AdminArticleResolverService], (service: AdminArticleResolverService) => {
    expect(service).toBeTruthy();
  }));
});
