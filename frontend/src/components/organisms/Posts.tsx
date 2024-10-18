// Utils
import useStore from "@/store";

// Components
import Post from "@/components/atoms/Post";

// Helpers
import { findCategory } from "@/utils";

// Styles
import "./Posts.scss";

function Posts() {
  const { categories, selectedCategory, posts } = useStore((state) => state);

  return (
    <div className="posts">
      <div>
        <p className="post-header">
          Found {posts.length} posts of "{findCategory(categories, selectedCategory)?.name}"
        </p>
      </div>
      <div className="content">
        {posts.length !== 0 ? (
          posts.map((post) => <Post {...post} />)
        ) : (
          <div className="empty">
            <p>There are no posts for this category</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Posts;
