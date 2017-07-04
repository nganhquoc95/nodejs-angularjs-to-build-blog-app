import { TestBed, inject } from '@angular/core/testing';

import { AdminArticleCategoryResolverService } from './article-category-resolver.service';

describe('AdminArticleCategoryResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminArticleCategoryResolverService]
    });
  });

  it('should ...', inject([AdminArticleCategoryResolverService], (service: AdminArticleCategoryResolverService) => {
    expect(service).toBeTruthy();
  }));
});
