import { Form, Link, useActionData } from '@remix-run/react';
import React, { useState, useEffect } from 'react';
import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { register } from '~/utils/auth.server';

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const username = formData.get('username');
  let email = formData.get('email');
  const password = formData.get('password');

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof email !== 'string'
  ) {
    return json(
      { error: 'Invalid form data', form: formData },
      { status: 400 }
    );
  }

  switch (request.method) {
    case 'POST':
      return await register(request, { email, password, username });

    default:
      return json({ error: 'Invalid request' }, { status: 400 });
  }
}

export default function NewUser() {
  const actionData = useActionData();

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage(actionData?.error || '');
    console.log(actionData);
  }, [actionData]);

  // const [fields, setFields] = useState({
  //   username: '',
  //   password: '',
  //   email: ''
  // });

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFields({
  //     ...fields,
  //     [e.target.name]: e.target.value
  //   });
  // };

  return (
    <div className='h-screen justify-center items-center flex'>
      <Form
        method='post'
        className='flex flex-col w-[30%] gap-4 border rounded shadow-lg px-4 py-4'
      >
        <p className='text-red-700 text-sm'>{errorMessage}</p>
        <div className='flex flex-col gap-1'>
          <label htmlFor='username' className='text-sm'>
            Username
          </label>
          <input
            type='text'
            name='username'
            required
            placeholder='username'
            className='p-2 border bg-blue-200 text-blue-800 font-[600] focus:border-blue-500 rounded w-full md:w-[100%]'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='username' className='text-sm'>
            Email
          </label>
          <input
            type='email'
            name='email'
            required
            placeholder='email'
            className='p-2 border bg-blue-200 text-blue-800 font-[600] focus:border-blue-500 rounded w-full md:w-[100%]'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='username' className='text-sm'>
            Password
          </label>
          <input
            type='password'
            name='password'
            required
            autoComplete='new-password'
            placeholder='******'
            className='p-2 border bg-blue-200 text-blue-800 font-[600] focus:border-blue-500 rounded w-full md:w-[100%]'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <button
            type='submit'
            className='bg-blue-800 mt-6 text-white hover:bg-blue-600 font-[600] shadow transition-all px-6 py-2 rounded-md'
          >
            Create account
          </button>
        </div>

        <Link to={'/login'}>Sign in</Link>
      </Form>
    </div>
  );
}
