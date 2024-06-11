import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { json, useLoaderData } from '@remix-run/react'
import { useParams } from "@remix-run/react";

import { Form, redirect } from '@remix-run/react'

import { db } from '../utils/db.server'


export async function action({ request }: ActionFunctionArgs) {
  const params = useParams();
  const schedid = params.schedid as string;
  const orderid = params.orderid as string;

  const formData = await request.formData()
  const name = formData.get('name') as string
  const pot = await db.pot.create({
    data: {
      name
    },
    select: { id: true }
  })

  return redirect(`/pottery/${schedid}/${orderid}`)
}

// this is what i am rendering to the page
export default function NewPot() {
  //get the data from the server
  // useActionData()
  return (
    <div>
      <Form method='POST'>
        <div>
          <label>
            Name
            <input type='text' name='name' required></input>
          </label>
        </div>

        <button type='submit'>Save</button>
      </Form>
    </div>
  )
}
