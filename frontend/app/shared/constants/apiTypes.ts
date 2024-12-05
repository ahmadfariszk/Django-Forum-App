export type LoginSignupPayload = {
    email: string;
    username: string;
    password: string;
}

export type CreatePostPayload = {
    title: string;
    caption: string;
    image_url?: string;
}

export type CreateCommentPayload = {
    post_id: number;
    text: string;
}

export const BASE_API_URL = 'http://13.211.124.176:8000' // Hardcoded for now because Remix's environment variables arent working