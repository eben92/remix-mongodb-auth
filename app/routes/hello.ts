import { json, LoaderArgs } from '@remix-run/node';
import type { ActionArgs } from '@remix-run/node';
export async function loader() {
  return json(
    {
      msg: 'hello world'
    },
    { status: 200 }
  );
}

export async function action({ request }: ActionArgs) {
  const { method } = request;
  // const { name }: any = body?.getReader();
  const name = async () => {
    try {
      const { name } = await request.json();

      console.log(name);
      return name;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const newnn = await name();

  if (!newnn) {
    return json({ msg: 'invalid request' }, { status: 400 });
  }
  console.log(newnn, 'name');

  switch (method) {
    case 'POST':
      // const

      return json(
        {
          msg: 'Post request',
          result: newnn
        },
        { status: 200 }
      );

    case 'PUT':
      return json(
        {
          msg: 'Put request'
          // result: formData.values()
        },
        { status: 200 }
      );

    default:
      return json(
        {
          msg: 'invalid request',
          result: null
        },
        { status: 405 }
      );
  }
}
