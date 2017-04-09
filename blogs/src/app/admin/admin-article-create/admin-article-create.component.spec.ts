import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticleCreateComponent } from './admin-article-create.component';

describe('AdminArticleCreateComponent', () => {
  let component: AdminArticleCreateComponent;
  let fixture: ComponentFixture<AdminArticleCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminArticleCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArticleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
