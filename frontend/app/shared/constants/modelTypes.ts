import { StringToBoolean } from "class-variance-authority/types";

// TypeScript interface matching the Django Post model
export type Post = {
    id: number;
    username: string;
    user_id: number
    image_url?: string; 
    caption: string | null;
    created_at: string; // ISO 8601 string from the backend
    updated_at: string; // ISO 8601 string from the backend
    comment_count: number;
    title: string;
    is_editable: boolean;
    is_deletable: boolean;
  }

  export type Comment = {
    id: number;
    post_id: number;
    user_id: number;
    username: string;
    text: string;
    created_at: string;
    updated_at: string;
    is_editable: boolean;
    is_deletable: boolean;
  }

  export type User = {
    id: number;
    username: string;
    name: string;
    email: string;
  }