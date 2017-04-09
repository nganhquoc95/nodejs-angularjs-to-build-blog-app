import { TestBed, inject } from '@angular/core/testing';

import { ArticleCategoryResolverService } from './article-category-resolver.service';

describe('ArticleCategoryResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleCategoryResolverService]
    });
  });

  it('should ...', inject([ArticleCategoryResolverService], (service: ArticleCategoryResolverService) => {
    expect(service).toBeTruthy();
  }));
});
