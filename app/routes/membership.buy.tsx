import { json, useLoaderData, Form } from '@remix-run/react'
import { db } from '../utils/db.server'
import { ActionFunctionArgs } from '@remix-run/node'

//this is my server
export async function loader() {
  const products = await db.product.findMany({
    where: {
      category: "member"
    }
  })
  const memberships = await db.product.findMany({
    where: {
      category: "membership"
    }
  })
  const cust_aq = await db.custAq.findMany()
  const availability = await db.availability.findMany()

  const schedule = await db.schedule.findMany()
  return json({
    products,
    memberships,
    schedule,
    cust_aq
  })
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const userData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    birthday: formData.get('birthday'),
    gender: formData.get('gender'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    streetAddress1: formData.get('streetAddress1'),
    streetAddress2: formData.get('streetAddress2'),
    city: formData.get('city'),
    state: formData.get('state'),
    zipcode: formData.get('zipcode'),
  }
  return null
}

// this is what i am rendering to the page
export default function BuyMembership() {
  //get the data from the server
  // useActionData()
  const data = useLoaderData<typeof loader>()
  return (
    <div className='mx-auto mt-16 max-w-7xl flex flex-col justify-center'>
      <h1 className='text-2xl align-center p-4'>Get Your Studio Membership!</h1>
      <Form method='POST' className='max-w-3xl'>
        <div className='border'>
          <div className='flex flex-row justify-between p-2'>
            <label className='px-2'>
              First Name <span className='text-red-700'>*</span>
              <input
                type='text'
                name='firstName'
                required
                autoFocus
                className='px-1 rounded p-1 min-w-72'
              ></input>
            </label>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='px-2'>
              Last Name <span className='text-red-700'>*</span>
              <input
                type='text'
                name='lastName'
                required
                autoFocus
                className='px-1 rounded p-1 min-w-72'
              ></input>
            </label>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='px-2'>
              Email <span className='text-red-700'>*</span>
              <input
                type='email'
                name='email'
                required
                className='px-1 rounded p-1 min-w-72'
              ></input>
            </label>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='px-2'>
              Phone <span className='text-red-700'>*</span>
              <input
                type='phone'
                name='phone'
                required
                className='px-1 rounded p-1 min-w-72'
              ></input>
            </label>
          </div>

        </div>

        <div className='border'>
          <div className='flex flex-row justify-between p-2'>
            <label className='px-2'>
              Which Membership? <span className='text-red-700'>*</span>
              <select name='membership' required className='px-1 rounded p-1 min-w-72'>
                <option value={""}>-- Select Your Membership --</option>
                {data.memberships.map(types => (
                  <option key={types.id} value={types.id}>
                    {types.name} - ${types.price}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='px-2'>
              Need Glaze or Clay? <span className='text-red-700'>*</span>
              <select name='products' required className='px-1 rounded p-1 min-w-72'>
                <option value={""}>-- Select Your Product --</option>
                {data.products.map(products => (
                  <option key={products.id} value={products.id}>
                    {products.name} - ${products.price}
                  </option>
                ))}
              </select>
            </label>
          </div>

        </div>

        <div className='p-4 align-center'>

          <button
            type='submit'
            className='bg-deep-green rounded px-4 py-2 text-white text-xl hover:bg-hover-green'
          >
            Checkout
          </button>
        </div>
      </Form>
    </div>
  )
}
