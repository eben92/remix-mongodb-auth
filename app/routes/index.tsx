// import { useOptionalUser } from '~/utils';

import { Link } from 'react-router-dom';

export default function Index() {
  // const user = useOptionalUser();

  // console.log(user);
  return (
    <div className='h-screen flex flex-col gap-4 items-center justify-center'>
      <Link
        to={'login'}
        className='bg-blue-800 text-white hover:bg-blue-600 font-[600] shadow transition-all px-6 py-2 rounded-md'
      >
        Login now
      </Link>
      <Link
        to={'new-user'}
        className='border border-blue-800 text-blue-800 hover:bg-blue-200 transition-all shadow font-[600] px-6 py-2 rounded-md'
      >
        Create new account
      </Link>
    </div>
  );
}
