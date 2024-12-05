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
  cardTitle?: string;
  cardDescription?: string;
  submitButtonText?: string;
  caption?: string | null;
  title?: string;
  imageUrl?: string;
  text?: string;
  isComment?: boolean; // Determines whether this is a post or a comment card
  onSubmitPost?: (title: string, caption: string, imageUrl?: string) => void; // Function to handle post submission
  onSubmitComment?: (text: string) => void; // Function to handle comment submission
  onCancel?: () => void;
  hasCancelButton?: boolean;
}

export const CreatePostOrCommentCard: React.FC<
  CreatePostOrCommentCardProps
> = ({
  caption,
  title,
  imageUrl,
  text,
  isComment = false, // Default to false, assuming the card is for creating a post
  onSubmitPost,
  onSubmitComment,
  cardTitle,
  cardDescription,
  submitButtonText,
  hasCancelButton,
  onCancel,
}) => {
  const [postTitle, setPostTitle] = useState(title || "");
  const [postCaption, setPostCaption] = useState(caption || "");
  const [postImage, setPostImage] = useState(imageUrl || "");
  const [commentText, setCommentText] = useState(text || "");

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
    setPostImage(event.target.value);
  };

  // Handle post submission
  const handlePostSubmit = () => {
    if (onSubmitPost && postTitle.trim() && postCaption.trim()) {
      onSubmitPost(postTitle, postCaption, postImage);
      setPostTitle(""); // Clear the input after submission
      setPostCaption("");
      setPostImage(""); // Clear image input
    }
  };

  // Handle post submission
  const handleCancel = () => {
    setPostTitle(""); // Clear the input after submission
    setPostCaption("");
    setPostImage(""); // Clear image input
    setCommentText(""); // Clear the input after submission
    onCancel?.();
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
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>

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
              label="Image URL"
              type="text"
              value={postImage}
              onChange={handleImageUpload}
              placeholder="Enter URL of your image"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-end -mt-4">
        {hasCancelButton && (
          <Button variant={"outline"} className="mr-4" onClick={handleCancel}>
            Cancel
          </Button>
        )}
        {isComment ? (
          <Button onClick={handleCommentSubmit}>{submitButtonText}</Button>
        ) : (
          <Button onClick={handlePostSubmit}>{submitButtonText}</Button>
        )}
      </CardFooter>
    </Card>
  );
};
