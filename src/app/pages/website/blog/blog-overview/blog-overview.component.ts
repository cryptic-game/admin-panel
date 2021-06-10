import { Component } from '@angular/core';
import { BlogService } from '../../../../core/api/website/blog/blog.service';
import { BlogPostId, BlogPostSmall } from '../../../../core/api/website/blog/blog.domain';

@Component({
  selector: 'app-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss']
})
export class BlogOverviewComponent {

  readonly displayedColumns = [ 'title', 'published', 'created', 'updated', 'description', 'view' ];

  constructor(
      private readonly blogService: BlogService
  ) {
  }

  get posts(): BlogPostSmall[] {
    return this.blogService.posts;
  }

  trackBy(index: number, { id }: BlogPostSmall): BlogPostId {
    return id;
  }
}
