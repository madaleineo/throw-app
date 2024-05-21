import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError
} from '@remix-run/react'

import stylesheet from './tailwind.css?url'

export function links () {
  return [{ rel: 'stylesheet', href: stylesheet }]
}

export function Layout ({ children }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='bg-burnt-orange'>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App () {
  return <Outlet />
}

export function ErrorBoundary () {
  const error = useRouteError()
  console.error(error)
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        Oh no! Nothing is working. Its so sad. Cry. A river. Build a Bridge. You
        know the rest.
        {/* add the UI you want your users to see */}
        <Scripts />
      </body>
    </html>
  )
}
