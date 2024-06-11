import { Outlet, json, useLoaderData, Link } from '@remix-run/react'
import { ensureAdmin } from '../utils/role-check.server'
import { db } from '../utils/db.server'
import { LoaderFunctionArgs } from '@remix-run/node'

export async function loader({ request }: LoaderFunctionArgs) {
  await ensureAdmin(request)
  //bring in items from
  const pots = await db.pot.findMany()
  return json({ pots })
}

export default function Pottery() {
  const data = useLoaderData<typeof loader>()

  return (
    <div>
      <h1 className='text-3xl font-bold'>Admin Portal</h1>
      <div style={{ display: 'flex' }}>
        <ul className='p-4'>
          <li className=''>
            <Link
              to='new'
              className='block rounded px-3 py-1 bg-deep-green hover:bg-hover-green hover:cursor-pointer'
            >
              Add New Pot
            </Link>
          </li>
          {data.pots.map(pot => (
            <li key={pot.id}>
              <Link to={`${pot.id}`}>{pot.name}</Link>
            </li>
          ))}
        </ul>
        <Outlet />
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  return <div>You ain't no admin!</div>
}
