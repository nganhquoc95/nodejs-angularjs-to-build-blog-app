import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAboutPageComponent } from './admin-about-page.component';

describe('AdminAboutPageComponent', () => {
  let component: AdminAboutPageComponent;
  let fixture: ComponentFixture<AdminAboutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAboutPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAboutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
