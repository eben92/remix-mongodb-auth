import { createUserSession } from '~/session/session.server';
import { json } from '@remix-run/node';
import { prisma } from './prisma.server';
import type { RegisterForm, LoginForm } from './types.server';
import { createUser } from './user.server';
import bcrypt from 'bcrypt';
export type { User } from '@prisma/client';

export const register = async (request: Request, form: RegisterForm) => {
  const exists = await prisma.user.count({
    where: { OR: [{ email: form.email }, { username: form.username }] }
  });

  console.log(exists);

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

  return createUserSession({
    request,
    redirectTo: '/',
    userId: newUser.id,
    remember: true
  });
};

// login method
export const login = async (request: Request, form: LoginForm) => {
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

  return createUserSession({
    request,
    redirectTo: '/',
    userId: user.id,
    remember: true
  });
};
