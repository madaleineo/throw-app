import { json, useLoaderData } from '@remix-run/react'
import { ensureAdmin } from '../utils/role-check.server'
import { LoaderFunctionArgs } from '@remix-run/node'
import { db } from '../utils/db.server'

export async function loader ({ params, request }: LoaderFunctionArgs) {
  await ensureAdmin(request)
  const id = params.id as string
  const pot = await db.pot.findUnique({ where: { id: +id } }) // the + sign turns a string into a number
  return json({ pot })
}

export default function Pottery () {
  const data = useLoaderData<typeof loader>()
  return (
    <div>
      <h1>You picked pot: {data.pot?.name}</h1>
    </div>
  )
}
