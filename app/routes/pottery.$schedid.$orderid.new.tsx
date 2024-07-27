import { ActionFunctionArgs } from '@remix-run/node'
import { Form, redirect } from "@remix-run/react";
import { db } from '../utils/db.server'


export async function action({ request, params }: ActionFunctionArgs) {
  const schedid = params.schedid as string;
  const orderid = params.orderid as string;

  const formData = await request.formData()
  const name = formData.get('name') as string
  const description = formData.get('desc') as string
  const glaze = +(formData.get('glaze') as string)
  await db.pot.create({
    data: {
      name,
      description,
      glaze,
      pot_order: {
        create: {
          order_id: +orderid
        }
      }
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
        <div>
          <label>
            Description
            <input type='text' name='desc'></input>
          </label>
        </div>
        <div>
          <label>
            Glaze
            <select name='glaze' required>
              <option value="1">T-bird</option>
              <option value="2">Sunshine</option>
              <option value="4">Starry Sky</option>
              <option value="5">Matte Black</option>
              <option value="0">Clear</option>
            </select>
          </label>
        </div>

        <button type='submit'>Save</button>
      </Form>
    </div>
  )
}
