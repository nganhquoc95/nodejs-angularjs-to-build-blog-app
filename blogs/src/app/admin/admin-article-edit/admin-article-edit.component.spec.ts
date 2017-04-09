import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticleEditComponent } from './admin-article-edit.component';

describe('AdminArticleEditComponent', () => {
  let component: AdminArticleEditComponent;
  let fixture: ComponentFixture<AdminArticleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminArticleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArticleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
