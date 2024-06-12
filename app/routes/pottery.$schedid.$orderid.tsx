import { Link, Outlet, json, useLoaderData } from '@remix-run/react'
import { ensureAdmin } from '../utils/role-check.server'
import { LoaderFunctionArgs } from '@remix-run/node'
import { db } from '../utils/db.server'

export async function loader({ params, request }: LoaderFunctionArgs) {
  await ensureAdmin(request)
  const orderid = params.orderid as string
  const pot_orders = await db.pot_order.findMany({
    where: { order_id: +orderid },
    include: {
      pot: true,
    }
  })
  return json({ pot_orders })
}

export default function Pottery() {
  const data = useLoaderData<typeof loader>()
  return (
    <div className='pl-12'>
      <div className='bg-white rounded p-4'>
        <table className='table '>
          <thead className='table-header-group'>
            <tr>
              <th className='p-2'>Name</th>
              <th className='p-2'>Description</th>
              <th className='p-2'>Glaze</th>
              <th className='p-2'>Status</th>
              <th className='p-2'>Edit</th>
              <th className='p-2'>Delete</th>
            </tr>
          </thead>
          <tbody className='table-row-group'>
            {data.pot_orders.map(order => (
              <tr className='text-right' key={order.pot.id}>
                <td>{order.pot.name}</td>
                <td className='p-2 pl-8'>{order.pot.description}</td>
                <td>{order.pot.glaze}</td>
                <td>{order.pot.status_id}</td>
                <td><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 float-right">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
                </td>
                <td><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 float-right">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link
        to='new'
        className='block rounded px-3 py-1 bg-deep-green hover:bg-hover-green hover:cursor-pointer'
      >
        Add New Pot
      </Link>
      <Outlet></Outlet>
    </div>
  )
}
