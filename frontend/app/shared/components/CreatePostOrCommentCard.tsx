import { Button } from "~/shared/shadcn-ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/shared/shadcn-ui/Card";
import { cn } from "../utils/cn";
import { useState } from "react";
import { InputWithLabel } from "./InputWithLabel";
import { TextareaWithLabel } from "./TextareaWithLabel";
import { Textarea } from "../shadcn-ui/Textarea";

interface CreatePostOrCommentCardProps {
  caption?: string | null;
  title?: string;
  isComment?: boolean; // Determines whether this is a post or a comment card
  onSubmitPost?: (title: string, caption: string, imageUrl?: string) => void; // Function to handle post submission
  onSubmitComment?: (text: string) => void; // Function to handle comment submission
}

export const CreatePostOrCommentCard: React.FC<
  CreatePostOrCommentCardProps
> = ({
  caption,
  title,
  isComment = false, // Default to false, assuming the card is for creating a post
  onSubmitPost,
  onSubmitComment,
}) => {
  const [postTitle, setPostTitle] = useState(title || "");
  const [postCaption, setPostCaption] = useState(caption || "");
  const [postImage, setPostImage] = useState<File | null>(null);
  const [commentText, setCommentText] = useState("");

  // Handle text changes for comment or post fields
  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentText(event.target.value);
  };

  const handlePostTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPostTitle(event.target.value);
  };

  const handlePostCaptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPostCaption(event.target.value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) setPostImage(file);
  };

  // Handle post submission
  const handlePostSubmit = () => {
    if (onSubmitPost && postTitle.trim() && postCaption.trim()) {
      onSubmitPost(
        postTitle,
        postCaption,
        postImage ? URL.createObjectURL(postImage) : undefined
      );
      setPostTitle(""); // Clear the input after submission
      setPostCaption("");
      setPostImage(null); // Clear image input
    }
  };

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (onSubmitComment && commentText.trim()) {
      onSubmitComment(commentText);
      setCommentText(""); // Clear the input after submission
    }
  };

  return (
    <Card className="w-[600px] mb-2">
      {isComment ? (
        <CardHeader>
          <CardTitle>Add a comment</CardTitle>
          <CardDescription>
            This comment will be visible to all other users.
          </CardDescription>
        </CardHeader>
      ) : (
        <CardHeader>
          <CardTitle>Create a New Post</CardTitle>
          <CardDescription>
            This post will be visible to all other users.
          </CardDescription>
        </CardHeader>
      )}

      <CardContent>
        {isComment ? (
          <div>
            <Textarea
              value={commentText}
              onChange={handleCommentChange}
              placeholder="Write your reply..."
              className="w-full p-2 border rounded-md"
            />
          </div>
        ) : (
          <div>
            <InputWithLabel
              label={"Title"}
              type="text"
              value={postTitle}
              onChange={handlePostTitleChange}
              placeholder="Enter post title"
            />
            <TextareaWithLabel
              label={"Text Content"}
              value={postCaption}
              onChange={handlePostCaptionChange}
              placeholder="Write your post content.."
            />
            <InputWithLabel
              label="Upload an Image"
              type="file"
              onChange={handleImageUpload}
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-end -mt-4">
        {isComment ? (
          <Button onClick={handleCommentSubmit}>Add</Button>
        ) : (
          <Button onClick={handlePostSubmit}>Create</Button>
        )}
      </CardFooter>
    </Card>
  );
};
