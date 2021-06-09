import { Component, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../../core/api/website/blog/blog.service';
import { DomSanitizer } from '@angular/platform-browser';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-post-new',
  templateUrl: './blog-post-new.component.html',
  styleUrls: ['./blog-post-new.component.scss']
})
export class BlogPostNewComponent implements OnInit, OnDestroy {

  private static readonly LANGUAGE_PATTERN = /[a-z]{2}/;
  private static readonly POST_ID_PATTERN = /[a-z-]+/;
  private static readonly IMAGE_PATTERN = /https:\/\/cdn\.cryptic-game\.net\/images\/blog\/(.+)\.jpe?g/;
  readonly form = this.fb.group({
    id: this.fb.group({
      language: [ '', Validators.pattern(BlogPostNewComponent.LANGUAGE_PATTERN) ],
      postId: [ '', Validators.pattern(BlogPostNewComponent.POST_ID_PATTERN) ]
    }),
    title: [ '', Validators.required ],
    description: [ '', Validators.required ],
    published: [ false, Validators.required ],
    image: [ '', Validators.pattern(BlogPostNewComponent.IMAGE_PATTERN) ],
    content: [ '', Validators.required ]
  });
  private descriptionSubscription?: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly blogService: BlogService,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    const description = this.form.get('description')!;
    this.descriptionSubscription = description.valueChanges.subscribe(value => description.setValue(value.replace('\n', ''), { emitEvent: false }));
  }

  ngOnDestroy(): void {
    this.descriptionSubscription?.unsubscribe();
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }

    this.blogService.addPost({
      ...this.form.value,
      content: this.sanitizer.sanitize(SecurityContext.HTML, this.form.value.content)
    })
      .pipe(mergeMap(post => this.router.navigate([ '..', post.id.language, post.id.postId ], { relativeTo: this.route })))
      .subscribe();
  }
}
