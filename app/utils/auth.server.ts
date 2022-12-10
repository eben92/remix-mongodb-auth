import { json } from '@remix-run/node';
import { prisma } from './prisma.server';
import type { RegisterForm, LoginForm } from './types.server';
import { createUser } from './user.server';
import bcrypt from 'bcrypt';

export const register = async (form: RegisterForm) => {
  const exists = await prisma.user.count({
    where: { email: form.email }
  });

  if (exists) {
    return json(
      {
        error: 'User email or username already inuse'
      },
      {
        status: 400
      }
    );
  }

  const newUser = await createUser(form);

  if (!newUser) {
    json(
      {
        error: 'Something went wrong tryibg to create a new user',
        fields: {
          email: form.email,
          username: form.username,
          password: form.password
        }
      },
      { status: 400 }
    );
  }

  return null;
};

// login method
export const login = async (form: LoginForm) => {
  const user = await prisma.user.findFirst({
    where: { OR: [{ email: form.username }, { username: form.username }] }
  });

  if (!user || !(await bcrypt.compare(form.password, user.password))) {
    return json(
      {
        error: 'incorrect login'
      },
      { status: 400 }
    );
  }

  return null;
};
