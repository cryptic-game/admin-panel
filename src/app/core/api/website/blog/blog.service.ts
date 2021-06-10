import { Injectable } from '@angular/core';
import { BlogApiService } from './blog-api.service';
import { BlogPost, BlogPostSmall, toSmallPost, updatePost } from './blog.domain';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private language0 = 'en';
  private posts0?: BlogPostSmall[];

  constructor(
    private readonly blogApiService: BlogApiService
  ) {
    this.updateCache(this.language0);
  }

  public get language(): string {
    return this.language0;
  }

  public set language(language: string) {
    this.language0 = language;
    this.updateCache(this.language0);
  }

  public get posts(): BlogPostSmall[] {
    return this.posts0 || [];
  }

  public findPost(language: string, postId: string): Observable<BlogPost> {
    return this.blogApiService.findBlogPost(language, postId)
      .pipe(tap(post => {
        if (post.id.language !== this.language0) {
          return;
        }

        const localPost = this.posts0?.find(p => p.id.postId === post.id.postId);

        if (localPost) {
          updatePost(localPost, post);
        }
        else {
          this.posts0?.push(toSmallPost(post));
        }
      }));
  }

  public addPost(post: BlogPost): Observable<BlogPost> {
    return this.blogApiService.addBlogPost(post)
      .pipe(tap(newPost => this.posts0?.push(toSmallPost(newPost))));
  }

  public updatePost(post: BlogPost): Observable<BlogPost> {
    return this.blogApiService.updateBlogPost(post)
      .pipe(tap(post => {
        if (post.id.language !== this.language0) {
          return;
        }

        const localPost = this.posts0?.find(p => p.id.postId === post.id.postId);

        if (localPost) {
          updatePost(localPost, post);
        }
        else {
          this.posts0?.push(toSmallPost(post));
        }
      }));
  }

  public updateCache(language: string): void {
    this.blogApiService.findBlogPosts(language)
      .subscribe(posts => this.posts0 = posts);
  }
}
