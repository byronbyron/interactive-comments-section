import data from './data.json';
import * as dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export const getComments = async () => {
  return data.comments;
};

export const createComment = async (text, replyingTo = null) => {
  const dateFromNow = dayjs(new Date().toISOString()).fromNow();

  return {
    id: Math.random().toString(36).substr(2, 9),
    content: text,
    createdAt: dateFromNow,
    score: 0,
    replyingTo: replyingTo,
    user: {
      image: { 
        png: data.currentUser.image.png,
        webp: data.currentUser.image.webp,
      },
      username: data.currentUser.username,
    },
    replies: [],
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};