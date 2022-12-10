import { Form, Link } from '@remix-run/react';
import React, { useState } from 'react';

export default function Login() {
  const [fields, setFields] = useState({
    username: '',
    password: ''
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='h-screen justify-center items-center flex'>
      <Form
        method='post'
        className='flex flex-col w-[30%] gap-4 border rounded shadow-lg px-4 py-4'
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor='username' className='text-sm'>
            Username/email
          </label>
          <input
            type='text'
            onChange={onChange}
            required
            name='username'
            placeholder='email/username'
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
            onChange={onChange}
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
            Login
          </button>
        </div>

        <Link to={'/new-user'}>Sign up</Link>
      </Form>
    </div>
  );
}
