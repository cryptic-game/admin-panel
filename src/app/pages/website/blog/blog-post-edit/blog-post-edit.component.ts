import { Component, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../../core/api/website/blog/blog.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogPost } from '../../../../core/api/website/blog/blog.domain';

@Component({
  selector: 'app-blog-post-edit',
  templateUrl: './blog-post-edit.component.html',
  styleUrls: ['./blog-post-edit.component.scss']
})
export class BlogPostEditComponent implements OnInit, OnDestroy {

  private static readonly IMAGE_REGEX = /https:\/\/cdn\.cryptic-game\.net\/images\/blog\/(.+)\.jpe?g/;
  post?: BlogPost;
  readonly form = this.fb.group({
    title: [ '', Validators.required ],
    description: [ '', Validators.required ],
    published: [ false, Validators.required ],
    image: [ '', Validators.pattern(BlogPostEditComponent.IMAGE_REGEX) ],
    content: [ '', Validators.required ]
  });
  private postSubscription?: Subscription;
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
    this.postSubscription = this.route.params.pipe(
      filter(({ postId }) => postId),
      switchMap(({ language, postId }) => this.blogService.findPost(language, postId)),
      tap(post => post.content = this.sanitizer.sanitize(SecurityContext.HTML, post.content) || '')
    ).subscribe(post => {
      this.form.reset();
      this.post = post;
      this.form.patchValue(post);
    });

    const description = this.form.get('description')!;
    this.descriptionSubscription = description.valueChanges
      .pipe(filter(value => value))
      .subscribe(value => description.setValue(value.replace('\n', ''), { emitEvent: false }));
  }

  ngOnDestroy(): void {
    this.postSubscription?.unsubscribe();
    this.descriptionSubscription?.unsubscribe();
  }

  save(): void {
    if (!this.form.valid || !this.post) {
      return;
    }

    this.blogService.updatePost({
      ...this.post,
      ...this.form.value,
      content: this.sanitizer.sanitize(SecurityContext.HTML, this.form.value.content)
    })
      .pipe(mergeMap(post => this.router.navigate(['..'], { relativeTo: this.route })))
      .subscribe();
  }
}
