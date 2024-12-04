// TypeScript interface matching the Django Post model
export type Post = {
    id: number;
    user: {
      id: number;
      name: string; // Assuming "name" is a field in the User model
    };
    image_url?: string; 
    caption: string | null;
    created_at: string; // ISO 8601 string from the backend
    updated_at: string; // ISO 8601 string from the backend
    comment_count: number;
    title: string;
  }

  export type Comment = {
    id: number;
    user: {
      id: number;
      name: string; // Assuming "name" is a field in the User model
    };
    post: Post; 
    text: string;
    created_at: string;
    updated_at: string;
  }

  export type User = {
    email: string;
    name: string;
  }