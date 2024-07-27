/* eslint-disable jsx-a11y/label-has-associated-control */
import { Form, useLoaderData, json } from '@remix-run/react'
import logo from '../images/throw.png'
import { db } from '../utils/db.server'

import React from 'react'
import { ActionFunctionArgs } from '@remix-run/node'

export async function loader() {
  const cust_aq = await db.custAq.findMany()
  return json({
    cust_aq
  })
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const first_name = formData.get('firstName') as string
  const last_name = formData.get('lastName') as string

  const birthday = formData.get('birthday') as string
  const gender = formData.get('gender') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const street_address1 = formData.get('streetAddress1') as string
  const street_address2 = formData.get('streetAddress2') as string
  const city = formData.get('city') as string
  const state = formData.get('state') as string
  const zipcode = formData.get('zipcode') as string

  await db.user.create({
    data: {
      first_name,
      last_name,
      birthday,
      gender,
      email,
      phone,
      street_address1,
      street_address2,
      city,
      state,
      zipcode,

    }
  })

  return null
}

export default function CreateNewAccount() {
  const [error, setError] = React.useState(false)
  const data = useLoaderData<typeof loader>()

  return (
    <div className='mx-auto mt-16 max-w-7xl text-center'>
      <div className='align-center'>
        <img src={logo} className='w-60' alt='Throw logo' />
      </div>
      <h1 className='text-2xl'>Create Your Account!</h1>

      <Form method='POST' className='max-w-3xl'>
        <div className='p-2'>
          <label className='align-left' htmlFor='username'>
            Username
          </label>
          <input
            name='username'
            id='username'
            required
            autoFocus
            className={error ? 'border-red-500' : ''}
          ></input>
        </div>
        <div className='p-2'>
          <label className='align-left ' htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            required
            className={error ? 'border-red-500' : ''}
          ></input>
        </div>
        {error && (
          <div className='text-sm text-red-500'>Invalid username or password</div>
        )}
        <div className='border'>
          <div className='flex flex-row justify-between p-2'>
            <label className='px-12'>
              First Name <span className='text-red-700'>*</span>
            </label>
            <input
              type='text'
              name='firstName'
              required
              className='px-1 rounded p-1 min-w-72'
            ></input>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='px-12'>
              Last Name <span className='text-red-700'>*</span>
            </label>
            <input
              type='text'
              name='lastName'
              required
              className='px-1 rounded p-1 min-w-72'
            ></input>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='px-12'>
              Email <span className='text-red-700'>*</span>
            </label>
            <input
              type='email'
              name='email'
              required
              className='px-1 rounded p-1 min-w-72'
            ></input>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='px-12'>
              Phone <span className='text-red-700'>*</span>
            </label>
            <input
              type='phone'
              name='phone'
              required
              className='px-1 rounded p-1 min-w-72'
            ></input>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='px-12'>
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
          </div>
        </div>

        <div className='border'>


          <div className='flex flex-row justify-between p-2'>
            <label className='px-12'>
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
            <label className='px-12'>Street Address 2</label>
            <input
              type='text'
              name='streetAddress2'
              className='px-1 rounded p-1 min-w-72'
            ></input>
          </div>

          <div
            className='flex flex-row justify-between p-2'
          >
            <label className='px-12'>
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
            <label className='px-12'>
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
            <label className='px-12'>
              Zip <span className='text-red-700'>*</span>
            </label>
            <input
              type='text'
              name='zip'
              required
              className='px-1 rounded p-1 min-w-72'
            ></input>
          </div>
        </div>


        <button
          type='submit'
          className='bg-deep-green rounded px-4 py-2 text-white text-xl hover:bg-hover-green'
        >
          Create Account
        </button>
      </Form>

    </div>
  )
}
