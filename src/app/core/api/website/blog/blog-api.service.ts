import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost, BlogPostSmall } from './blog.domain';
import { environment } from '../../../../../environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogApiService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  public findBlogPosts(language: string): Observable<BlogPostSmall[]> {
    return this.http.get<BlogPostSmall[]>(`${environment.api}/website/blog/${language}`).pipe(take(1));
  }

  public findBlogPost(language: string, postId: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.api}/website/blog/${language}/${postId}`).pipe(take(1));
  }

  public addBlogPost(post: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${environment.api}/website/blog`, post).pipe(take(1));
  }

  public updateBlogPost(post: BlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${environment.api}/website/blog/${post.id.language}/${post.id.postId}`, post).pipe(take(1));
  }

  public deletePost(language: string, postId: string): Observable<void> {
    return this.http.delete<void>(`${environment.api}/website/blog/${language}/${postId}`).pipe(take(1));
  }
}
