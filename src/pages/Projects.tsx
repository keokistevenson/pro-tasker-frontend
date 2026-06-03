import { Link } from "react-router-dom";
import { posts } from "../lib/posts";

function BlogIndex() {
  return (
    <main>
      <h1>Blog Posts</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default BlogIndex;