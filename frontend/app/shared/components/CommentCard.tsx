import React from "react";
import { cn } from "../utils/cn"; // Assuming you have a utility for combining classNames
import { Card, CardContent, CardHeader, CardFooter } from "../shadcn-ui/Card"; // Assuming these are parts of your Card component
import { Dot } from "lucide-react";

interface CardProps {
  userName: string;
  text: string;
  createdAt: string;
}

export const CommentCard: React.FC<CardProps> = ({ userName, text, createdAt }) => {
  return (
    <Card className="w-[600px] rounded-lg border shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className='py-4'>
        <div className="font-bold text-md flex items-center">
          {userName} <Dot className="text-zinc-500" />
          <span className=" text-zinc-500 font-light text-sm">
            Posted {new Date(createdAt).toLocaleString()}
          </span>
        </div>
      </CardHeader>
      <CardContent className="text-gray-700">
        <p>{text}</p>
      </CardContent>
    </Card>
  );
};
