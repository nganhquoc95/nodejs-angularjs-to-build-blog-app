import { TestBed, inject } from '@angular/core/testing';

import { AdminPageService } from './admin-page.service';

describe('AdminPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminPageService]
    });
  });

  it('should ...', inject([AdminPageService], (service: AdminPageService) => {
    expect(service).toBeTruthy();
  }));
});
