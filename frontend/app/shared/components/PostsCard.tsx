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

interface PostsCardProps {
  userName: string;
  imageUrl?: string;
  caption: string | null;
  createdAt: string;
  totalComments?: number;
  isIndividualPostPage?: boolean;
  title: string;
  onClickTotalComments?: () => void;
  onClickComment?: () => void;
}

export const PostsCard: React.FC<PostsCardProps> = ({
  userName,
  imageUrl,
  caption,
  createdAt,
  totalComments,
  isIndividualPostPage,
  title,
  onClickTotalComments,
  onClickComment
}) => {
  return (
    <>
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            by <strong>{userName}</strong> posted on{" "}
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
              <Button onClick={onClickTotalComments} variant="outline">{totalComments} Comments</Button>
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
