import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticleDeleteComponent } from './admin-article-delete.component';

describe('AdminArticleDeleteComponent', () => {
  let component: AdminArticleDeleteComponent;
  let fixture: ComponentFixture<AdminArticleDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminArticleDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArticleDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
