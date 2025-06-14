/* eslint-disable jsx-a11y/label-has-associated-control */
import { json, useLoaderData, Form } from '@remix-run/react'
import { db } from '../utils/db.server'
import { useState } from 'react'
import { parseISO, format } from 'date-fns';
import { ActionFunctionArgs } from '@remix-run/node';
import type * as Prisma from '@prisma/client';



//this is my server
export async function loader() {
  const clay = await db.product.findMany({
    where: {
      category: "clay"
    }
  })
  const bookings = await db.product.findMany({
    where: {
      category: "booking"
    },
    orderBy: {
      price: 'asc'
    }
  })
  const schedules = await db.schedule.findMany()
  const cust_aq = await db.custAq.findMany()
  return json({
    delivery: [
      { id: 'pickup', label: 'Self Pickup' },
      { id: 'shipping', label: 'Shipping (Includes Fees)' },
      // { id: 'delivery', label: 'I qualify for the delivery plan!' }
    ],
    clay,
    bookings,
    cust_aq,
    schedules
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
  const orderData = {
    numWheels: formData.get('numWheels'),
    numShared: formData.get('numShared'),
    type: formData.get('type'),
  }
  const scheduleData = {
    date_time: formData.get('firstName')
  }
  return null
}

// this is what i am rendering to the page
export default function BookUrExperience() {
  //get the data from the server
  // useActionData()
  const [quantity, setQuantity] = useState(0);
  const [potteryClass, setPotteryClass] = useState<Prisma.Product>();
  const [clayType, setClayType] = useState<Prisma.Product>();
  const data = useLoaderData<typeof loader>()
  return (
    <div className='mx-auto mt-16 max-w-7xl flex flex-col justify-center'>
      <h1 className='text-2xl p-4 align-center'>Book Your Pottery Experience!</h1>
      <Form method='POST' className='max-w-3xl'>

        <div className='bg-white rounded-lg py-4 px-6'>
          <div className='flex flex-row justify-between p-2'>
            <label className='pr-4'>
              Book Your Class <span className='text-red-700'>*</span>
            </label>

            <select
              name="type"
              required
              className="px-1 rounded p-1 min-w-72 border border-gray-300"
              onChange={(e) => {
                const id = parseInt(e.target.value);
                const selectedClass = data.bookings.find((cls) => cls.id === id);
                // You can update state here if needed
                setPotteryClass(selectedClass);
              }}
            >
              <option value=''>
                -- Select Your Class --
              </option>
              {data.bookings.map((types) => (
                <option key={types.id} value={types.id}>
                  {types.name} - ${types.price}
                </option>
              ))}
            </select>
          </div>

          {!!potteryClass && <div className="p-4">
            <p className="font-bold">{potteryClass.name}</p>
            <p>{potteryClass.duration}</p>
            <p className="py-2" >{potteryClass.description}</p>
            <p className="py-2" >Bookings are based on the number of wheels you would like to reserve. If there are members in your group who are NOT making a pot (or if you are sharing a wheel), please DO NOT include them in your booking. For example, if you and your date are sharing a wheel then only book for 1 wheel. So excited to have you in the studio!</p>
            <p className="py-2" >${potteryClass.price}/wheel + tax</p>
          </div>}

          <div className='flex flex-row justify-between p-2'>
            <label className='pr-4'>
              Quantity <span className='text-red-700'>*</span>
            </label>
            <select
              name='numWheels'
              required
              className='px-1 rounded p-1 min-w-72 border border-gray-300'
              onChange={(e) => {
                const quantity = parseInt(e.target.value);
                setQuantity(quantity);

              }}
            >
              {[...Array(11)].map((_, index) => (
                <option key={index} value={index}>{index}</option>
              ))}
            </select>
          </div>

          <div className="pb-4 pl-2">
            <p className="py-1 text-gray-400" id="">Select the quantity of wheels you would like to reserve. <span className="float-right">${((potteryClass?.price || 0) * quantity) || 0} subtotal</span></p>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='pr-4'>
              Number of Shared Wheels <span className='text-red-700'>*</span>
            </label>
            <select
              name='numShared'
              required
              className='px-1 rounded p-1 min-w-72 border border-gray-300'
            >
              {[...Array(11)].map((_, index) => (
                <option key={index} value={index}>{index} </option>
              ))}
            </select>
          </div>
          <div className="pb-4 pl-2">
            <p className="py-1 text-gray-400" id="">Select the quantity of wheels you plan to share.</p>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='pr-4'>
              Find a Time <span className='text-red-700'>*</span>
            </label>
            <select name='time' required className='px-1 rounded p-1 min-w-72 border border-gray-300'>
              {data.schedules.map(sched => {
                const formattedDate = format(parseISO(sched.class_date), 'MMMM do @ h:mm a');
                return (
                  <option key={sched.id} value={sched.id}>{formattedDate} - {sched.num_wheels_available} spots left!</option>
                );
              })}
            </select>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='pr-4'>
              Clay Type <span className='text-red-700'>*</span>
            </label>
            <select name='type' required className='px-1 rounded p-1 min-w-72 border border-gray-300' onChange={(e) => {
              const clayId = parseInt(e.target.value);
              const clayType = data.clay.find((cls) => cls.id === clayId);
              setClayType(clayType);
            }}>
              <option value={""}>-- Select Your Clay Type --</option>
              {data.clay.map(types => (
                <option key={types.id} value={types.id}>
                  {types.name} - ${types.price}
                </option>
              ))}
            </select>
          </div>

          <div className="pb-4 pl-2">
            <p className="py-1 text-gray-400" id="">Select the type of clay you plan to use. <span className="float-right">${(((potteryClass?.price || 0) + (clayType?.price || 0)) * quantity) || 0} subtotal</span></p>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='pr-4'>
              Pottery Pick Up Plan <span className='text-red-700'>*</span>
            </label>
            <select
              name='delivery'
              required
              className='px-1 rounded p-1 min-w-72 border border-gray-300'
            >
              <option value={""}>-- Select Your Pick Up Plan --</option>

              {data.delivery.map(delivery => (
                <option key={delivery.id} value={delivery.id}>
                  {delivery.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='bg-white rounded-lg py-4 px-6 my-2'>
          <div className='flex flex-row justify-between p-2'>
            <label className='pr-4'>
              First Name <span className='text-red-700'>*</span>
            </label>
            <input
              type='text'
              name='firstName'
              required
              autoFocus
              className='px-1 rounded p-1 min-w-72 border border-gray-300'
            ></input>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='pr-4'>
              Last Name <span className='text-red-700'>*</span>
            </label>
            <input
              type='text'
              name='lastName'
              required
              autoFocus
              className='px-1 rounded p-1 min-w-72 border border-gray-300'
            ></input>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='pr-4'>
              Email <span className='text-red-700'>*</span>
            </label>
            <input
              type='email'
              name='email'
              required
              className='px-1 rounded p-1 min-w-72 border border-gray-300'
            ></input>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='pr-4'>
              Phone <span className='text-red-700'>*</span>
            </label>
            <input
              type='phone'
              name='phone'
              required
              className='px-1 rounded p-1 min-w-72 border border-gray-300'
            ></input>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='pr-4'>
              How did you hear about us? <span className='text-red-700'>*</span>
            </label>
            <select name='cust_aq' required className='px-1 rounded p-1 min-w-72 border border-gray-300'>
              <option value="">-- Select --</option>
              {data.cust_aq.map(cust => (
                <option key={cust.id} value={cust.id}>
                  {cust.type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='bg-white rounded-lg py-4 px-6'>
          <div className='flex flex-row justify-between p-2'>
            <label className='pr-4'>
              Street Address 1 <span className='text-red-700'>*</span>
            </label>
            <input
              type='text'
              name='streetAddress1'
              required
              className='px-1 rounded p-1 min-w-72 border border-gray-300'
            ></input>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='pr-4'>Street Address 2</label>
            <input
              type='text'
              name='streetAddress2'
              className='px-1 rounded p-1 min-w-72 border border-gray-300'
            ></input>
          </div>

          <div
            className='flex flex-row justify-between p-2'
          >
            <label className='pr-4'>
              City <span className='text-red-700'>*</span>
            </label>
            <input
              type='text'
              name='city'
              required
              className='px-1 rounded p-1 min-w-72 border border-gray-300'
            ></input>
          </div>

          <div className='flex flex-row justify-between p-2'>
            <label className='pr-4'>
              State <span className='text-red-700'>*</span>
            </label>
            <select name='state' required className='px-1 rounded p-1 min-w-72 border border-gray-300'>
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
            <label className='pr-4'>
              Zip <span className='text-red-700'>*</span>
            </label>
            <input
              type='text'
              name='zip'
              required
              className='px-1 rounded p-1 min-w-72 border border-gray-300'
            ></input>
          </div>
        </div>


        <button
          type='submit'
          className='bg-deep-green rounded px-4 py-2 text-white text-xl hover:bg-hover-green my-2'
        >
          Checkout
        </button>
      </Form>
    </div>
  )
}
