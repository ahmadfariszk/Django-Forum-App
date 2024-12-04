import { useParams } from "@remix-run/react";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CommentCard } from "~/shared/components/CommentCard";
import { CreatePostOrCommentCard } from "~/shared/components/CreatePostOrCommentCard";
import PaginationWithData from "~/shared/components/PaginationWithData";
import { PostsCard } from "~/shared/components/PostsCard";
import { Comment, Post } from "~/shared/types/general";
import { mockComments, mockPosts } from "~/test/mockData";

export const IndividualPostPage = () => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const urlParams = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsPostLoading(true);
        // const response = await fetch("https://api.example.com/post"); // Replace with your actual API endpoint
        // if (!response.ok) {
        //   throw new Error(`Error fetching post: ${response.status}`);
        // }
        // const data = await response.json();
        const data = mockPosts?.filter(
          (post) => post.id?.toString() === urlParams?.postId
        ); // Replace fetch with mock data
        setPost(data[0]);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setIsPostLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        setIsCommentLoading(true);
        // const response = await fetch("https://api.example.com/post"); // Replace with your actual API endpoint
        // if (!response.ok) {
        //   throw new Error(`Error fetching post: ${response.status}`);
        // }
        // const data = await response.json();
        const data = mockComments?.filter(
          (comment) => comment?.post?.id?.toString() === urlParams?.postId
        ); // Replace fetch with mock data
        setComments(data);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setIsCommentLoading(false);
      }
    };

    fetchPost();
    fetchComments();
  }, []);

  const handleSubmitComment = (text: string) => {
    console.log("Reply submitted:", text);
    // Handle create comment
    // Handle get comment after creating
  };

  return (
    <div className="flex flex-col items-center py-12 gap-4">
      {isPostLoading && <p>Loading post...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isPostLoading && !error && !post && <p>No post available.</p>}
      {!isPostLoading && !error && (
        <PostsCard
          title={post.title}
          key={post.id}
          userName={post.user.name}
          imageUrl={post.image_url}
          caption={post.caption}
          createdAt={post.created_at}
          totalComments={post.totalComments}
          isIndividualPostPage={true}
        />
      )}
      <CreatePostOrCommentCard
        isComment={true}
        onSubmitComment={handleSubmitComment}
      />

      <div className="text-2xl text-white w-[600px] flex gap-2 items-center">
        Comments {isCommentLoading && <Loader className="animate-spin" />}
      </div>
      {!isCommentLoading &&
        !error &&
        comments?.map((comment) => (
          <CommentCard
            userName={comment.user.name}
            text={comment.text}
            createdAt={comment.created_at}
          />
        ))}

      <PaginationWithData />
    </div>
  );
};
