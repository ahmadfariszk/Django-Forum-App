import { useNavigate, useParams } from "@remix-run/react";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import AlertDialog from "~/shared/components/AlertDialog";
import { CommentCard } from "~/shared/components/CommentCard";
import { CreatePostOrCommentCard } from "~/shared/components/CreatePostOrCommentCard";
import PaginationWithData from "~/shared/components/PaginationWithData";
import { PostCard } from "~/shared/components/PostCard";
import {
  BASE_API_URL,
  CreateCommentPayload,
  CreatePostPayload,
} from "~/shared/constants/apiTypes";
import { Comment, Post } from "~/shared/constants/modelTypes";
import { getAccessToken } from "~/shared/utils/browserStorage";
import { useUser } from "~/shared/utils/userContext";

export const IndividualPostPage = () => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [editingPostId, setEditingPostId] = useState(0);
  const [deletingPostId, setDeletingPostId] = useState(0);
  const [editingCommentId, setEditingCommentId] = useState(0);
  const [deletingCommentId, setDeletingCommentId] = useState(0);
  const [isOpenConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const urlParams = useParams();
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    try {
      setIsPostLoading(true);
      const response = await fetch(
        `${BASE_API_URL}/api/posts/get/${urlParams.postId}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching posts: ${response.status}`);
      }
      const data = await response.json();
      setPost({
        ...data,
        is_editable: data.user_id === user?.id,
        is_deletable: data.user_id === user?.id,
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsPostLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      setIsCommentLoading(true);
      const response = await fetch(
        `${BASE_API_URL}/api/comments/getall/${urlParams.postId}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching comments: ${response.status}`);
      }
      const data = await response.json();
      setComments(
        data?.items?.map((item) => ({
          ...item,
          is_editable: item.user_id === user?.id,
          is_deletable: item.user_id === user?.id,
        }))
      );
      setCommentsCount(data.count);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsCommentLoading(false);
    }
  };

  const callCreateCommentApi = async (payload: CreateCommentPayload) => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/comments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken(
            localStorage,
            sessionStorage
          )}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Error creating comment: ${response.status}`);
      }
      await fetchComments();
    } catch (err: any) {
      if (err.status === 401) {
        navigate("/login");
      }
    }
  };

  const callUpdateCommentApi = async (
    payload: CreateCommentPayload,
    commentId: number
  ) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}/api/comments/update/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken(
              localStorage,
              sessionStorage
            )}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        const error = new Error(`Error updating comment: ${response.status}`);
        (error as any).status = response.status;
        throw error;
      }
      await fetchComments();
    } catch (err: any) {
      if (err.status === 401) {
        navigate("/login");
      }
    } finally {
      setEditingCommentId(0);
    }
  };

  const callDeleteCommentApi = async (commentId: number) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}/api/comments/delete/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken(
              localStorage,
              sessionStorage
            )}`,
          },
        }
      );
      if (!response.ok) {
        const error = new Error(`Error creating post: ${response.status}`);
        (error as any).status = response.status;
        throw error;
      }
      await fetchComments();
    } catch (err: any) {
      if (err.status === 401) {
        navigate("/login");
      }
    } finally {
      setDeletingCommentId(0);
    }
  };

  const handleSubmitComment = (text: string) => {
    callCreateCommentApi({ post_id: Number(urlParams.postId), text });
  };

  const handleEditComment = async (text: string) => {
    await callUpdateCommentApi(
      { post_id: Number(urlParams.postId), text },
      editingCommentId
    );
  };

  const handleClickEdit = (commentId: number) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(0);
  };

  const handleClickDelete = (commentId: number) => {
    setDeletingCommentId(commentId);
    setOpenConfirmDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setDeletingCommentId(0);
  };

  const handleConfirmDelete = () => {
    callDeleteCommentApi(deletingCommentId);
  };

  const callUpdatePostApi = async (payload: CreatePostPayload) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}/api/posts/update/${urlParams.postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken(
              localStorage,
              sessionStorage
            )}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        const error = new Error(`Error updating post: ${response.status}`);
        (error as any).status = response.status;
        throw error;
      }
      await fetchPost();
    } catch (err: any) {
      if (err.status === 401) {
        navigate("/login");
      }
    } finally {
      setEditingPostId(0);
    }
  };

  const callDeletePostApi = async () => {
    try {
      const response = await fetch(
        `${BASE_API_URL}/api/posts/delete/${urlParams.postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken(
              localStorage,
              sessionStorage
            )}`,
          },
        }
      );
      if (!response.ok) {
        const error = new Error(`Error deleting post: ${response.status}`);
        (error as any).status = response.status;
        throw error;
      }
      navigate("/");
    } catch (err: any) {
      if (err.status === 401) {
        navigate("/login");
      }
    } finally {
      setDeletingPostId(0);
    }
  };

  const handleEditPost = async (
    title: string,
    caption: string,
    image_url?: string
  ) => {
    await callUpdatePostApi({ title, caption, image_url });
  };

  const handleClickEditPost = () => {
    setEditingPostId(Number(urlParams.postId));
  };

  const handleCancelEditPost = () => {
    setEditingPostId(0);
  };

  const handleClickDeletePost = () => {
    setDeletingPostId(Number(urlParams.postId));
    setOpenConfirmDeleteModal(true);
  };

  const handleCancelDeletePost = () => {
    setDeletingPostId(0);
  };

  const handleConfirmDeletePost = () => {
    callDeletePostApi();
  };

  return (
    <div className="flex flex-col items-center py-12 gap-4">
      {/* Post */}
      {isPostLoading && <p>Loading post...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isPostLoading &&
        !error &&
        post &&
        (editingPostId === post.id ? (
          <CreatePostOrCommentCard
            onSubmitPost={handleEditPost}
            cardTitle="Edit Post"
            cardDescription="Your edited post will be visible to all users."
            submitButtonText="Edit"
            hasCancelButton={true}
            title={post.title}
            imageUrl={post.image_url}
            caption={post.caption}
            onCancel={handleCancelEditPost}
          />
        ) : (
          <PostCard
            {...post}
            createdAt={post.created_at}
            isIndividualPostPage={true}
            isEditable={post.is_editable}
            isDeletable={post.is_deletable}
            onClickEdit={handleClickEditPost}
            onClickDelete={handleClickDeletePost}
          />
        ))}

      {/* Create Comment */}
      <CreatePostOrCommentCard
        isComment={true}
        onSubmitComment={handleSubmitComment}
        cardTitle={"Add a comment"}
        cardDescription={"This comment will be visible to all other users."}
        submitButtonText="Add"
      />

      {/* Comments */}
      <div className="text-2xl text-white w-[600px] flex gap-2 items-center">
        Comments{" "}
        {isCommentLoading ? (
          <Loader className="animate-spin" />
        ) : (
          `(${commentsCount})`
        )}
      </div>
      {!isCommentLoading &&
        !error &&
        comments?.map((comment) =>
          editingCommentId === comment.id ? (
            <CreatePostOrCommentCard
              isComment={true}
              onSubmitComment={handleEditComment}
              cardTitle="Edit Comment"
              cardDescription="Your edited comment will be visible to all users."
              submitButtonText="Edit"
              hasCancelButton={true}
              text={comment.text}
              onCancel={handleCancelEdit}
            />
          ) : (
            <CommentCard
              {...comment}
              createdAt={comment.created_at}
              isDeletable={comment.is_deletable}
              isEditable={comment.is_editable}
              onClickEdit={() => handleClickEdit(comment.id)}
              onClickDelete={() => handleClickDelete(comment.id)}
            />
          )
        )}

      <PaginationWithData />

      {/* Confirm Delete Modal */}
      <AlertDialog
        isOpen={isOpenConfirmDeleteModal}
        setIsOpen={setOpenConfirmDeleteModal}
        title={`Delete ${deletingCommentId ? 'Comment' : 'Post'}`}
        description={`This will permanently delete your ${deletingCommentId ? 'comment' : 'post'}.`}
        text={
          `Are you sure you want to delete this ${deletingCommentId ? 'comment' : 'post'}? It will no longer be visible to others.`
        }
        submitButtonText={"Delete"}
        onSubmit={deletingCommentId ? handleConfirmDelete : handleConfirmDeletePost}
        onCancel={deletingCommentId ? handleCancelDelete : handleCancelDeletePost}
      />
    </div>
  );
};
