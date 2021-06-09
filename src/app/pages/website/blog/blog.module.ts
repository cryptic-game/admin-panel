import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogOverviewComponent } from './blog-overview/blog-overview.component';
import { BlogPostEditComponent } from './blog-post-edit/blog-post-edit.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { CdkTableModule } from '@angular/cdk/table';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../core/shared/shared.module';
import { BlogPostNewComponent } from './blog-post-new/blog-post-new.component';

@NgModule({
  declarations: [
    BlogOverviewComponent,
    BlogPostEditComponent,
    BlogPostNewComponent,
    BlogPostComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    CdkTableModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class BlogModule {
}
