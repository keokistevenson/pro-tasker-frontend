import { useParams } from "react-router-dom";
import { posts } from "../lib/posts";

function BlogPost() {
  const { slug } = useParams();

  // Find the post whose slug matches the URL
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return (
      <main>
        <h1>Post not found</h1>
        <p>No blog post exists with that URL.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
}

export default BlogPost;