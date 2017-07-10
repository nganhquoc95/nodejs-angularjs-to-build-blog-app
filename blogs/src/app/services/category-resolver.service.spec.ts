import { TestBed, inject } from '@angular/core/testing';

import { CategoryResolverService } from './category-resolver.service';

describe('CategoryResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryResolverService]
    });
  });

  it('should ...', inject([CategoryResolverService], (service: CategoryResolverService) => {
    expect(service).toBeTruthy();
  }));
});
