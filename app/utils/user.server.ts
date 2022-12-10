import { prisma } from './prisma.server';
import type { RegisterForm } from './types.server';
import bcrypt from 'bcrypt';

export const createUser = async (user: RegisterForm) => {
  const passwordHash = await bcrypt.hash(user.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHash,
      username: user.username,
      profile: {
        firstname: '',
        lastname: ''
      }
    }
  });

  return { id: newUser.id, email: newUser.email };
};
