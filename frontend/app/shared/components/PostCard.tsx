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
import { Pencil, Trash2 } from "lucide-react";
import IconButton from "./IconButton";

interface PostCardProps {
  username: string;
  imageUrl?: string;
  caption: string | null;
  createdAt: string;
  totalComments?: number;
  isIndividualPostPage?: boolean;
  title: string;
  isEditable?: boolean;
  isDeletable?: boolean;
  onClickTotalComments?: () => void;
  onClickComment?: () => void;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  username,
  imageUrl,
  caption,
  createdAt,
  totalComments,
  isIndividualPostPage,
  title,
  onClickTotalComments,
  onClickComment,
  isEditable,
  isDeletable,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <>
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {title}{" "}
            <div className="flex gap-1">
              {isEditable && (
                <IconButton
                  icon={<Pencil />}
                  variant={"outline"}
                  className="h-8 mx-0"
                  onClick={onClickEdit}
                />
              )}
              {isDeletable && (
                <IconButton
                  icon={<Trash2 />}
                  variant={"outline"}
                  className="h-8 mx-0"
                  onClick={onClickDelete}
                />
              )}
            </div>
          </CardTitle>
          <CardDescription>
            by <strong>{username}</strong> posted on{" "}
            {new Date(createdAt).toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Post image"
                className="mb-2 max-w-full rounded"
              />
            )}
            {caption && (
              <p className={cn({ "line-clamp-5": !isIndividualPostPage })}>
                {caption}
              </p>
            )}
          </div>
        </CardContent>
        {isIndividualPostPage ? (
          <CardFooter>
            <p className="text-zinc-600">
              {totalComments ? `${totalComments} comments` : "No comments yet."}
            </p>
          </CardFooter>
        ) : (
          <CardFooter className="flex justify-between">
            {totalComments ? (
              <Button onClick={onClickTotalComments} variant="outline">
                {totalComments} Comments
              </Button>
            ) : (
              <p className="text-zinc-600">No comments yet.</p>
            )}
            <Button onClick={onClickComment}>Comment</Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
};
