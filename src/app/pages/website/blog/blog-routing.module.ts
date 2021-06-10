import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogOverviewComponent } from './blog-overview/blog-overview.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogPostEditComponent } from './blog-post-edit/blog-post-edit.component';
import { BlogPostNewComponent } from './blog-post-new/blog-post-new.component';

const routes: Routes = [
  { path: '', component: BlogOverviewComponent },
  { path: 'new', component: BlogPostNewComponent },
  { path: ':language/:postId', component: BlogPostComponent },
  { path: ':language/:postId/edit', component: BlogPostEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
