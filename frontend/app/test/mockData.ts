import { Comment, Post, User } from "~/shared/constants/modelTypes";

export const mockPosts: Post[] = [
  {
    id: 1,
    user: {
      id: 101,
      name: "John Doe",
    },
    image_url: "https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4=",
    caption: "Enjoying a sunny day! Today is a truly magnificent day, \n the kind of sunny, vibrant day that fills the heart with a sense of joy and wonder. From the very moment the sun peeks over the horizon, casting its golden light over the world, it’s impossible not to feel uplifted by its warmth. The sky is a flawless canvas of deep, radiant blue, unmarred by even the slightest cloud, creating the perfect backdrop for this perfect day. There’s a distinct crispness in the air, just enough to remind you that the seasons are still in transition, but the sun is here to take charge, pushing the chill of morning away with its powerful rays. As the day progresses, the sunlight dances on every surface it touches, transforming ordinary objects into something almost magical. The leaves of trees, still adorned in their autumn hues, shimmer and flicker as the breeze moves through them, their edges glowing with a soft, golden light. Every blade of grass seems to be celebrating the sun’s return, stretching higher and catching the light, making the earth feel alive in a way that’s almost palpable. It’s the kind of day where even the smallest things—like a bird soaring overhead, or a flower slowly unfurling its petals—take on a beauty that’s impossible to ignore. Walking outside feels like stepping into a dream, as if the whole world is basking in the sun’s embrace. The warmth on your skin is almost intoxicating, the kind of warmth that seeps into your bones and makes you feel connected to the earth, to the moment, to everything around you. The air smells fresh and clean, filled with the scent of grass, flowers, and that indescribable fragrance that only seems to exist on perfect days like today. You can feel the sunlight on your face, caressing your skin like an old friend, as you breathe in the beauty of it all.",
    created_at: "2024-12-01T12:00:00Z",
    updated_at: "2024-12-01T14:00:00Z",
    totalComments: 32,
    title: "Look at the weather",
  },
  {
    id: 2,
    user: {
      id: 102,
      name: "Jane Smith",
    },
    image_url: undefined, // Corrected to undefined
    caption: "No image, just vibes!",
    created_at: "2024-12-02T10:30:00Z",
    updated_at: "2024-12-02T11:00:00Z",
    totalComments: 16,
    title: "Rawr",
  },
  {
    id: 3,
    user: {
      id: 103,
      name: "Alice Johnson",
    },
    image_url: "https://example.com/image3.jpg",
    caption: "What a breathtaking view!",
    created_at: "2024-12-03T08:00:00Z",
    updated_at: "2024-12-03T08:30:00Z",
    totalComments: 0,
    title: "Rate from 1 to 10",
  },
];

export const mockComments: Comment[] = [
  {
    id: 1,
    user: {
      id: 201,
      name: "Mike Fisher",
    },
    post: {
      id: 1,
      user: {
        id: 101,
        name: "John Doe",
      },
      image_url: "https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4=",
      caption: "Enjoying a sunny day! Today is a truly magnificent day, \n the kind of sunny, vibrant day that fills the heart with a sense of joy and wonder. From the very moment the sun peeks over the horizon, casting its golden light over the world, it’s impossible not to feel uplifted by its warmth. The sky is a flawless canvas of deep, radiant blue, unmarred by even the slightest cloud, creating the perfect backdrop for this perfect day. There’s a distinct crispness in the air, just enough to remind you that the seasons are still in transition, but the sun is here to take charge, pushing the chill of morning away with its powerful rays. As the day progresses, the sunlight dances on every surface it touches, transforming ordinary objects into something almost magical. The leaves of trees, still adorned in their autumn hues, shimmer and flicker as the breeze moves through them, their edges glowing with a soft, golden light. Every blade of grass seems to be celebrating the sun’s return, stretching higher and catching the light, making the earth feel alive in a way that’s almost palpable. It’s the kind of day where even the smallest things—like a bird soaring overhead, or a flower slowly unfurling its petals—take on a beauty that’s impossible to ignore. Walking outside feels like stepping into a dream, as if the whole world is basking in the sun’s embrace. The warmth on your skin is almost intoxicating, the kind of warmth that seeps into your bones and makes you feel connected to the earth, to the moment, to everything around you. The air smells fresh and clean, filled with the scent of grass, flowers, and that indescribable fragrance that only seems to exist on perfect days like today. You can feel the sunlight on your face, caressing your skin like an old friend, as you breathe in the beauty of it all.",
      created_at: "2024-12-01T12:00:00Z",
      updated_at: "2024-12-01T14:00:00Z",
      totalComments: 32,
      title: "Look at the weather",
    },
    text: "Such a beautiful day, I love how you described it! Can't wait to enjoy some sunshine myself.",
    created_at: "2024-12-03T08:00:00Z",
    updated_at: "2024-12-01T13:30:00Z",
  },
  {
    id: 2,
    user: {
      id: 202,
      name: "Emily Parker",
    },
    post: {
      id: 1,
      user: {
        id: 101,
        name: "John Doe",
      },
      image_url: "https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4=",
      caption: "Enjoying a sunny day! Today is a truly magnificent day, \n the kind of sunny, vibrant day that fills the heart with a sense of joy and wonder. From the very moment the sun peeks over the horizon, casting its golden light over the world, it’s impossible not to feel uplifted by its warmth. The sky is a flawless canvas of deep, radiant blue, unmarred by even the slightest cloud, creating the perfect backdrop for this perfect day. There’s a distinct crispness in the air, just enough to remind you that the seasons are still in transition, but the sun is here to take charge, pushing the chill of morning away with its powerful rays. As the day progresses, the sunlight dances on every surface it touches, transforming ordinary objects into something almost magical. The leaves of trees, still adorned in their autumn hues, shimmer and flicker as the breeze moves through them, their edges glowing with a soft, golden light. Every blade of grass seems to be celebrating the sun’s return, stretching higher and catching the light, making the earth feel alive in a way that’s almost palpable. It’s the kind of day where even the smallest things—like a bird soaring overhead, or a flower slowly unfurling its petals—take on a beauty that’s impossible to ignore. Walking outside feels like stepping into a dream, as if the whole world is basking in the sun’s embrace. The warmth on your skin is almost intoxicating, the kind of warmth that seeps into your bones and makes you feel connected to the earth, to the moment, to everything around you. The air smells fresh and clean, filled with the scent of grass, flowers, and that indescribable fragrance that only seems to exist on perfect days like today. You can feel the sunlight on your face, caressing your skin like an old friend, as you breathe in the beauty of it all.",
      created_at: "2024-12-01T12:00:00Z",
      updated_at: "2024-12-01T14:00:00Z",
      totalComments: 32,
      title: "Look at the weather",
    },
    text: "I wish I could enjoy the sun more often. Living in the city makes it hard to find such peaceful moments.",
    created_at: "2024-12-01T14:00:00Z",
    updated_at: "2024-12-01T14:15:00Z",
  },
  {
    id: 3,
    user: {
      id: 204,
      name: "David Lee",
    },
    post: {
      id: 2,
      user: {
        id: 102,
        name: "Jane Smith",
      },
      image_url: undefined,
      caption: "No image, just vibes!",
      created_at: "2024-12-02T10:30:00Z",
      updated_at: "2024-12-02T11:00:00Z",
      totalComments: 16,
      title: "Rawr",
    },
    text: "This post really speaks to me. Sometimes, it's about the vibes, not the pictures.",
    created_at: "2024-12-02T11:15:00Z",
    updated_at: "2024-12-02T11:30:00Z",
  },
  {
    id: 4,
    user: {
      id: 205,
      name: "Sophia Turner",
    },
    post: {
      id: 2,
      user: {
        id: 102,
        name: "Jane Smith",
      },
      image_url: undefined,
      caption: "No image, just vibes!",
      created_at: "2024-12-02T10:30:00Z",
      updated_at: "2024-12-02T11:00:00Z",
      totalComments: 16,
      title: "Rawr",
    },
    text: "I completely agree! The energy in your words is all we need. Keep posting!",
    created_at: "2024-12-02T12:00:00Z",
    updated_at: "2024-12-02T12:30:00Z",
  },
  {
    id: 5,
    user: {
      id: 206,
      name: "Chris Miles",
    },
    post: {
      id: 3,
      user: {
        id: 103,
        name: "Alice Johnson",
      },
      image_url: "https://example.com/image3.jpg",
      caption: "What a breathtaking view!",
      created_at: "2024-12-03T08:00:00Z",
      updated_at: "2024-12-03T08:30:00Z",
      totalComments: 0,
      title: "Rate from 1 to 10",
    },
    text: "This view is incredible! I'd rate it a solid 9/10. What do you think?",
    created_at: "2024-12-03T09:00:00Z",
    updated_at: "2024-12-03T09:15:00Z",
  }
]

export const mockUser: User = {
  email: 'test@nada.com',
  name: 'Jarra'
}