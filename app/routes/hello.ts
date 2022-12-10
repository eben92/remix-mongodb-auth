import { json } from '@remix-run/node';
import type { ActionArgs } from '@remix-run/node';
import { getStoredCrons, storeCron } from '~/cron';
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
