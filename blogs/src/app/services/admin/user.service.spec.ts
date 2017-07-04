import { TestBed, inject } from '@angular/core/testing';

import { AdminUserService } from './user.service';

describe('AdminUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
  });

  it('should ...', inject([AdminUserService], (service: AdminUserService) => {
    expect(service).toBeTruthy();
  }));
});
