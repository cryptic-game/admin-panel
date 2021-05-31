export interface BlogPostSmall {
  id: {
    language: string;
    postId: string;
  };
  title: string;
  image: string;
  created: string;
  updated: string;
  published: boolean;
  description: string;
}

export interface BlogPost extends BlogPostSmall {
  content: string;
}

export function toSmallPost(post: BlogPost): BlogPostSmall {
  return {
    id: post.id,
    title: post.title,
    image: post.image,
    created: post.created,
    updated: post.updated,
    published: post.published,
    description: post.description
  };
}

export function updatePost(post: BlogPostSmall, newPost: BlogPost): void {
  post.title = newPost.title;
  post.image = newPost.image;
  post.created = newPost.created;
  post.updated = newPost.updated;
  post.published = newPost.published;
  post.description = newPost.description;
}
