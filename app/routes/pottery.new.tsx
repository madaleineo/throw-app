import { ActionFunctionArgs } from '@remix-run/node'
import { Form, redirect } from '@remix-run/react'

import { db } from '../utils/db.server'

export async function action ({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const name = formData.get('name') as string
  const pot = await db.pot.create({
    data: { name },
    select: { id: true }
  })

  return redirect(`/pottery/${pot.id}`)
}

// this is what i am rendering to the page
export default function NewPot () {
  //get the data from the server
  // useActionData()
  return (
    <div>
      <h1>Add a New Pot</h1>
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
