import jwt from 'jsonwebtoken';

export const createRefreshToken = (_id: string, username: string) => {
  return jwt.sign({ _id, username }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d' // can be less or more than that
  });
};
