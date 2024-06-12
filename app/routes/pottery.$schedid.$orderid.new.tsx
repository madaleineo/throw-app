import { ActionFunctionArgs } from '@remix-run/node'
import { useParams, Form, redirect } from "@remix-run/react";
import { db } from '../utils/db.server'


export async function action({ request }: ActionFunctionArgs) {
  const params = useParams();
  // const schedid = params.schedid as string;
  // const orderid = params.orderid as string;

  const formData = await request.formData()
  const name = formData.get('name') as string
  const description = formData.get('desc') as string
  const pot = await db.pot.create({
    data: {
      name, description
    },
    select: { id: true }
  })

  return redirect(`/pottery`)
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
              <option value="1">White Crackle</option>
              <option value="2">Blue</option>
              <option value="3">Yellow</option>
              <option value="4">Pink</option>
              <option value="5">Brown</option>
            </select>
          </label>
        </div>

        <button type='submit'>Save</button>
      </Form>
    </div>
  )
}
