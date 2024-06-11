import { Link, Outlet, json, useLoaderData } from '@remix-run/react'
import { ensureAdmin } from '../utils/role-check.server'
import { LoaderFunctionArgs } from '@remix-run/node'
import { db } from '../utils/db.server'

export async function loader({ params, request }: LoaderFunctionArgs) {
  await ensureAdmin(request)
  const schedid = params.schedid as string
  const orders = await db.order.findMany({
    where: { schedule_id: +schedid },
    include: {
      pot_order: {
        where: { order_id: +schedid },
        include: { pot: true, },
      },
    },
  })
  return json({ orders })
}

export default function Group() {
  const data = useLoaderData<typeof loader>()
  return (
    <div className='flex flex-row pl-12'>
      <div>
        <ul>
          {data.orders.map(order => (
            <li className='font-bold' key={order.id}>
              <Link to={`${order.id}`}>
                {order.name} Group
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
