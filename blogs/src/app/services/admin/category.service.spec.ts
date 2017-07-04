import { TestBed, inject } from '@angular/core/testing';

import { AdminCategoryService } from './category.service';

describe('AdminCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminCategoryService]
    });
  });

  it('should ...', inject([AdminCategoryService], (service: AdminCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
