import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react';
import styles from './tailwind.css';
import type { LoaderArgs, LinksFunction, MetaFunction } from '@remix-run/node';
import { getUser } from './session/session.server';
import { connect } from './db/db.server';
// import dbConnect from './db/db.server';
connect();
export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1'
});

export async function loader({ request }: LoaderArgs) {
  // console.log(request);

  // dbConnect();

  return json({
    user: await getUser(request)
  });
}

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
