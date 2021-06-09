import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostNewComponent } from './blog-post-new.component';

describe('BlogPostNewComponent', () => {
  let component: BlogPostNewComponent;
  let fixture: ComponentFixture<BlogPostNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogPostNewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
