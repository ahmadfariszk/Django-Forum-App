import React from "react";
import { cn } from "../utils/cn"; // Assuming you have a utility for combining classNames
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "../shadcn-ui/Card"; // Assuming these are parts of your Card component
import { Dot, Pencil, Trash2 } from "lucide-react";
import IconButton from "./IconButton";

interface CardProps {
  username: string;
  text: string;
  createdAt: string;
  isEditable?: boolean;
  isDeletable?: boolean;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
}

export const CommentCard: React.FC<CardProps> = ({
  username,
  text,
  createdAt,
  onClickDelete,
  onClickEdit,
  isDeletable,
  isEditable,
}) => {
  return (
    <Card className="w-[600px] rounded-lg border shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="py-4 flex justify-between">
        <CardTitle className="flex items-center justify-between text-md">
          <div className="font-bold text-md flex items-center">
            {username} <Dot className="text-zinc-500" />
            <span className=" text-zinc-500 font-light text-sm">
              Posted {new Date(createdAt).toLocaleString()}
            </span>
          </div>
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
      </CardHeader>
      <CardContent className="text-gray-700">
        <p>{text}</p>
      </CardContent>
    </Card>
  );
};
