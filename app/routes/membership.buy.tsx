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

          {/* <div className='flex flex-row justify-between p-2'>
            <label className='px-2'>
              How did you hear about us? <span className='text-red-700'>*</span>
            </label>
            <select name='cust_aq' required className='px-1 rounded p-1 min-w-72'>
              <option value={""}>-- Select --</option>
              {data.cust_aq.map(cust => (
                <option key={cust.id} value={cust.id}>
                  {cust.type}
                </option>
              ))}
            </select>
          </div> */}
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

          {/* <div className='flex flex-row justify-between p-2'>
            <label className='px-2'>
              Schedule Your Onboarding with JP <span className='text-red-700'>*</span>
            </label>
            <select name='jpOnboarding' required className='px-1 rounded p-1 min-w-72'>
              {data.availability.map(time => (
                <option key={time.id} value={time.id}>
                  {time.day} {time.time}
                </option>
              ))}
            </select>
          </div> */}

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

        {/* <div className='border'>

          <div className='flex flex-row justify-between p-2'>
            <label className='px-2'>
              Street Address 1 <span className='text-red-700'>*</span>
            </label>
            <input
              type='text'
              name='streetAddress1'
              required
              className='px-1 rounded p-1 min-w-72'
            ></input>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='px-2'>Street Address 2</label>
            <input
              type='text'
              name='streetAddress2'
              className='px-1 rounded p-1 min-w-72'
            ></input>
          </div>

          <div
            className='flex flex-row justify-between p-2'
          >
            <label className='px-2'>
              City <span className='text-red-700'>*</span>
            </label>
            <input
              type='text'
              name='city'
              required
              className='px-1 rounded p-1 min-w-72'
            ></input>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='px-2'>
              State <span className='text-red-700'>*</span>
            </label>
            <select name='state' required className='px-1 rounded p-1 min-w-72'>
              <option value='UT'>Utah</option>
              <option value='AL'>Alabama</option>
              <option value='AK'>Alaska</option>
              <option value='AZ'>Arizona</option>
              <option value='AR'>Arkansas</option>
              <option value='CA'>California</option>
              <option value='CO'>Colorado</option>
              <option value='CT'>Connecticut</option>
              <option value='DE'>Delaware</option>
              <option value='DC'>District Of Columbia</option>
              <option value='FL'>Florida</option>
              <option value='GA'>Georgia</option>
              <option value='HI'>Hawaii</option>
              <option value='ID'>Idaho</option>
              <option value='IL'>Illinois</option>
              <option value='IN'>Indiana</option>
              <option value='IA'>Iowa</option>
              <option value='KS'>Kansas</option>
              <option value='KY'>Kentucky</option>
              <option value='LA'>Louisiana</option>
              <option value='ME'>Maine</option>
              <option value='MD'>Maryland</option>
              <option value='MA'>Massachusetts</option>
              <option value='MI'>Michigan</option>
              <option value='MN'>Minnesota</option>
              <option value='MS'>Mississippi</option>
              <option value='MO'>Missouri</option>
              <option value='MT'>Montana</option>
              <option value='NE'>Nebraska</option>
              <option value='NV'>Nevada</option>
              <option value='NH'>New Hampshire</option>
              <option value='NJ'>New Jersey</option>
              <option value='NM'>New Mexico</option>
              <option value='NY'>New York</option>
              <option value='NC'>North Carolina</option>
              <option value='ND'>North Dakota</option>
              <option value='OH'>Ohio</option>
              <option value='OK'>Oklahoma</option>
              <option value='OR'>Oregon</option>
              <option value='PA'>Pennsylvania</option>
              <option value='RI'>Rhode Island</option>
              <option value='SC'>South Carolina</option>
              <option value='SD'>South Dakota</option>
              <option value='TN'>Tennessee</option>
              <option value='TX'>Texas</option>
              <option value='UT'>Utah</option>
              <option value='VT'>Vermont</option>
              <option value='VA'>Virginia</option>
              <option value='WA'>Washington</option>
              <option value='WV'>West Virginia</option>
              <option value='WI'>Wisconsin</option>
              <option value='WY'>Wyoming</option>
            </select>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='px-2'>
              Zip <span className='text-red-700'>*</span>
            </label>
            <input
              type='text'
              name='zip'
              required
              className='px-1 rounded p-1 min-w-72'
            ></input>
          </div>
        </div> */}

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
