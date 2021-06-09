import { Component, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../../core/api/website/blog/blog.service';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { BlogPost } from '../../../../core/api/website/blog/blog.domain';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, OnDestroy {

  post?: BlogPost;
  private subscription?: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly blogService: BlogService,
    private readonly sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.pipe(
      filter(({ postId }) => postId),
      switchMap(({ language, postId }) => this.blogService.findPost(language, postId)),
      tap(post => post.content = this.sanitizer.sanitize(SecurityContext.HTML, post.content) || '')
    ).subscribe(post => this.post = post);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
