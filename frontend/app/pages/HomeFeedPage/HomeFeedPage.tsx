import { useNavigate } from "@remix-run/react";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AlertDialog from "~/shared/components/AlertDialog";
import { CreatePostOrCommentCard } from "~/shared/components/CreatePostOrCommentCard";
import PaginationWithData from "~/shared/components/PaginationWithData";
import { PostCard } from "~/shared/components/PostCard";
import { BASE_API_URL, CreatePostPayload } from "~/shared/constants/apiTypes";
import { Post } from "~/shared/constants/modelTypes";
import { getAccessToken } from "~/shared/utils/browserStorage";
import { useUser } from "~/shared/utils/userContext";
import { mockPosts } from "~/test/mockData";

export const HomeFeedPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [postCount, setPostCount] = useState(0);
  const [editingPostId, setEditingPostId] = useState(0);
  const [deletingPostId, setDeletingPostId] = useState(0);
  const [isOpenConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [user, setUser] = useUser();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/posts/getall`);
      if (!response.ok) {
        const error = new Error(`Error creating post: ${response.status}`);
        (error as any).status = response.status;
        throw error;
      }
      const data = await response.json();
      // const data = mockPosts; // Replace fetch with mock data

      const updatedItems = data?.map((item: Post) => ({
        ...item,
        is_editable: item.user_id === user?.id,
        is_deletable: item.user_id === user?.id,
      }));
      setPosts(updatedItems);
      setPostCount(data.count);
    } catch (err: any) {
      setPostCount(0);
      setError(err.message || "An unexpected error occurred");
      if (err.status !== 401) toast.error('Failed to retrieve forum posts, try contacting the admin to report this issue.')
    } finally {
      setIsLoading(false);
    }
  };

  const callCreatePostApi = async (payload: CreatePostPayload) => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/posts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure it's JSON
          Authorization: `Bearer ${getAccessToken(
            localStorage,
            sessionStorage
          )}`, // Add the Bearer token here
        },
        body: JSON.stringify(payload), // Pass the payload as the request body
      });
      if (!response.ok) {
        const error = new Error(`Error creating post: ${response.status}`);
        (error as any).status = response.status;
        throw error;
      }
      await fetchPosts();
      toast.success('Post created! View your post in the list of posts below.')
    } catch (err: any) {
      console.error("Failed to create post", err.status);
      if (err.status === 401) {
        navigate("/login");
      }
    }
  };

  const callUpdatePostApi = async (
    payload: CreatePostPayload,
    postId: number
  ) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}/api/posts/update/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Ensure it's JSON
            Authorization: `Bearer ${getAccessToken(
              localStorage,
              sessionStorage
            )}`, // Add the Bearer token here
          },
          body: JSON.stringify(payload), // Pass the payload as the request body
        }
      );
      if (!response.ok) {
        const error = new Error(`Error updating post: ${response.status}`);
        (error as any).status = response.status;
        throw error;
      }
      await fetchPosts();
    } catch (err: any) {
      console.error("Failed to update post", err.status);
      if (err.status === 401) {
        navigate("/login");
      }
    } finally {
      setEditingPostId(0);
    }
  };

  const callDeletePostApi = async (
    postId: number
  ) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}/api/posts/delete/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // Ensure it's JSON
            Authorization: `Bearer ${getAccessToken(
              localStorage,
              sessionStorage
            )}`, // Add the Bearer token here
          },
          // body: JSON.stringify(payload), // Pass the payload as the request body
        }
      );
      if (!response.ok) {
        const error = new Error(`Error deleting post: ${response.status}`);
        (error as any).status = response.status;
        throw error;
      }
      await fetchPosts();
    } catch (err: any) {
      console.error("Failed to update post", err.status);
      if (err.status === 401) {
        navigate("/login");
      }
    } finally {
      setDeletingPostId(0);
    }
  };

  const handleClickComment = (id?: string | number) => {
    navigate(`/posts/${id}`);
  };

  const handleSubmitPost = async (
    title: string,
    caption: string,
    image_url?: string
  ) => {
    await callCreatePostApi({
      title,
      caption,
      image_url,
    });
  };

  const handleEditPost = async (
    title: string,
    caption: string,
    image_url?: string
  ) => {
    await callUpdatePostApi({
      title,
      caption,
      image_url,
    }, editingPostId);
  };

  const handleClickEdit = (postId: number) => {
    setEditingPostId(postId);
  };

  const handleCancelEdit = () => {
    setEditingPostId(0);
  }

  const handleClickDelete = (postId: number) => {
    setDeletingPostId(postId);
    setOpenConfirmDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setDeletingPostId(0);
  }

  const handleConfirmDelete = () => {
    callDeletePostApi(deletingPostId);
  }

  return (
    <div className="flex flex-col items-center py-12">
      <CreatePostOrCommentCard
        onSubmitPost={handleSubmitPost}
        cardTitle="Create a New Post"
        cardDescription="This post will be visible to all other users."
        submitButtonText="Create"
      />
      <div className="text-2xl my-4 text-white w-[600px] flex gap-2 items-center">
        Posts{" "}
        {isLoading && <Loader className="animate-spin" />}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && posts?.length === 0 && <p>No posts available.</p>}
      {!isLoading &&
        !error &&
        posts?.map((post) => (
          <div className="pb-4">
            {editingPostId === post?.id ? (
              <CreatePostOrCommentCard
                onSubmitPost={handleEditPost}
                cardTitle="Edit Post"
                cardDescription="Your edited post will be visible to all users."
                submitButtonText="Edit"
                hasCancelButton={true}
                title={post?.title}
                imageUrl={post?.image_url}
                caption={post?.caption}
                onCancel={handleCancelEdit}
              />
            ) : (
              <PostCard
                title={post?.title}
                key={post?.id}
                username={post?.username}
                imageUrl={post?.image_url}
                caption={post?.caption}
                createdAt={post?.created_at}
                totalComments={post?.comment_count}
                onClickComment={() => {
                  handleClickComment(post?.id);
                }}
                onClickTotalComments={() => {
                  handleClickComment(post?.id);
                }}
                isDeletable={post.user_id === user?.id}
                isEditable={post.user_id === user?.id}
                onClickEdit={() => handleClickEdit(post?.id)}
                onClickDelete={() => handleClickDelete(post?.id)}
              />
            )}
          </div>
        ))}
      <PaginationWithData />
      <AlertDialog 
        isOpen={isOpenConfirmDeleteModal}
        setIsOpen={setOpenConfirmDeleteModal}
        title={'Delete Post'}
        description={'This will permanently delete your post.'}
        text={'Are you sure you want to delete this post? All your content in this post will be permanently removed and all users won\'t be able to view it anymore.'}
        submitButtonText={'Delete'}
        onSubmit={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};
