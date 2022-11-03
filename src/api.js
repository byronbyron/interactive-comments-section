import data from './data.json';

export const getComments = async () => {
  return data.comments;
};

export const createComment = async (text, replyingTo = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    content: text,
    createdAt: new Date().toISOString(),
    score: 0,
    replyingTo,
    user: {
      image: { 
        png: './images/avatars/image-juliusomo.png',
        webp: './images/avatars/image-juliusomo.webp',
      },
      username: 'juliusomo',
    },
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};