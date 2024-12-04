import { useNavigate } from "@remix-run/react";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CreatePostOrCommentCard } from "~/shared/components/CreatePostOrCommentCard";
import PaginationWithData from "~/shared/components/PaginationWithData";
import { PostsCard } from "~/shared/components/PostsCard";
import { BASE_API_URL } from "~/shared/constants/apiTypes";
import { Post } from "~/shared/constants/modelTypes";
import { mockPosts } from "~/test/mockData";

export const HomeFeedPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/api/posts/getall`);
        if (!response.ok) {
          throw new Error(`Error fetching posts: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        // const data = mockPosts; // Replace fetch with mock data
        setPosts(data.items);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleClickComment = (id?: string | number) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className="flex flex-col items-center py-12">
      <CreatePostOrCommentCard
        onSubmitPost={(title, caption, imageUrl) =>
          console.log("Post submitted", title, caption, imageUrl)
        }
      />
      <div className="text-2xl my-4 text-white w-[600px] flex gap-2 items-center">
        Posts {isLoading && <Loader className="animate-spin" />}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && posts.length === 0 && <p>No posts available.</p>}
      {!isLoading &&
        !error &&
        posts?.map((post) => (
          <div className="pb-4">
            <PostsCard
              title={post.title}
              key={post.id}
              userName={post.user.name}
              imageUrl={post.image_url}
              caption={post.caption}
              createdAt={post.created_at}
              totalComments={post.comment_count}
              onClickComment={() => {
                handleClickComment(post.id);
              }}
              onClickTotalComments={() => {
                handleClickComment(post.id);
              }}
            />
          </div>
        ))}
      <PaginationWithData />
    </div>
  );
};
