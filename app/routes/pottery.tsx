import { Outlet, json, useLoaderData, Link } from '@remix-run/react'
import { ensureAdmin } from '../utils/role-check.server'
import { db } from '../utils/db.server'
import { LoaderFunctionArgs } from '@remix-run/node'
import { parseISO, format } from 'date-fns';

export async function loader({ request }: LoaderFunctionArgs) {
  await ensureAdmin(request)
  //bring in items from
  const pots = await db.pot.findMany()
  const schedules = await db.schedule.findMany({
    orderBy: [
      { class_date: 'asc' },  // Order by class_date ascending
      { class_time: 'asc' }   // Order by class_time ascending
    ]
  })
  return json({ pots, schedules })
}

export default function Pottery() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className='p-4 flex-col align-left'>
      <div>
        <h1 className='text-3xl font-bold'>Admin Portal</h1>
      </div>
      <div className='flex flex-row'>

        <div>
          <ul className='p-4'>
            {data.schedules.map(sched => {
              const formattedDate = format(parseISO(sched.class_date), 'MMMM do');
              const formattedTime = format(parseISO(sched.class_time), 'h:mm a');
              return (
                <li key={sched.id}>
                  <Link to={`${sched.id}`}>{formattedDate} @ {formattedTime}</Link>
                </li>
              );
            })}
            {/* {data.schedules.map(sched => (
            <li key={sched.id}>
            <Link to={`${sched.id}`}>{sched.date_time}</Link>
            </li>
          ))} */}
          </ul>
        </div>
        <div>
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export function ErrorBoundary() {
  return <div>You ain't no admin!</div>
}
