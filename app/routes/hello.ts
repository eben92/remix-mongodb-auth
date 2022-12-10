import { json } from '@remix-run/node';
import type { ActionArgs } from '@remix-run/node';
import { getStoredCrons, storeCron } from '~/cron';

export async function getPokemons() {
  const res = await fetch(
    'https://www.oddapk.com/api/hello'
    // 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
  ).then((res) => res.json());

  console.log(res);
  return res;
}
export async function loader() {
  // try {
  //   const res = await fetch('https://oddapk.com/api/v1/games', {
  //     method: 'GET',
  //     headers: { 'content-type': 'application/json' }
  //   });

  //   const j = res.json();

  //   console.log(j);
  // } catch (error) {
  //   console.log(error);
  // }

  const res = await getPokemons();
  console.log(res, 'ree');

  return json(
    {
      data: res,
      msg: 'hello world'
    },
    { status: 200 }
  );
}

export async function action({ request }: ActionArgs) {
  const { method } = request;
  // const { name }: any = body?.getReader();

  switch (method) {
    case 'POST':
      const cronData = {
        title: 'test - ' + new Date().getDay(),
        id: ''
      };

      const existingNotes = await getStoredCrons();
      cronData.id = new Date().toISOString();

      const updatedCron = existingNotes.concat(cronData);

      await storeCron(updatedCron);

      return json(
        {
          msg: 'Success'
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
