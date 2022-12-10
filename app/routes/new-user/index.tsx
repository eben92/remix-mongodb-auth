import { Form, Link } from '@remix-run/react';

export default function NewUser() {
  return (
    <div className='h-screen justify-center items-center flex'>
      <Form
        method='post'
        className='flex flex-col w-[30%] gap-4 border rounded shadow-lg px-4 py-4'
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor='username' className='text-sm'>
            Username
          </label>
          <input
            type='text'
            name='username'
            required
            placeholder='email/username'
            className='p-2 border bg-blue-200 text-blue-800 font-[600] focus:border-blue-500 rounded w-full md:w-[100%]'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='username' className='text-sm'>
            Email
          </label>
          <input
            type='email'
            name='username'
            required
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
