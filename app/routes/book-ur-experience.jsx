import { json, useLoaderData, Form } from '@remix-run/react'
import { db } from '../utils/db.server'

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
    }
  })
  const cust_aq = await db.cust_aq.findMany()
  return json({
    appointmentTimes: [
      { id: 'mon6', label: 'Monday @ 6:00 PM', productId: 8 },
      { id: 'mon8', label: 'Monday @ 8:00 PM', productId: 8 },
      { id: 'tue6', label: 'Tuesday @ 6:00 PM', productId: 8 },
      { id: 'tue8', label: 'Tuesday @ 8:00 PM', productId: 8 },
      { id: 'wed6', label: 'Wednesday @ 6:00 PM', productId: 8 },
      { id: 'wed8', label: 'Wednesday @ 8:00 PM', productId: 8 },
      { id: 'thurs6', label: 'Thursday @ 6:00 PM', productId: 8 },
      { id: 'thurs8', label: 'Thursday @ 8:00 PM', productId: 8 },
      { id: 'fri4', label: 'Friday @ 4:00 PM', productId: 8 },
      { id: 'fri6', label: 'Friday @ 6:00 PM', productId: 8 },
      { id: 'fri8', label: 'Friday @ 8:00 PM', productId: 8 },
      { id: 'sat10', label: 'Saturday @ 10:00 AM', productId: 8 },
      { id: 'sat12', label: 'Saturday @ 12:00 PM', productId: 8 },
      { id: 'sat2', label: 'Saturday @ 2:00 PM', productId: 8 },
      { id: 'sat4', label: 'Saturday @ 4:00 PM', productId: 8 },
      { id: 'sat6', label: 'Saturday @ 6:00 PM', productId: 8 },
      { id: 'sat8', label: 'Saturday @ 8:00 PM', productId: 8 },
    ],
    delivery: [
      { id: 'pickup', label: 'Self Pickup' },
      { id: 'shipping', label: 'Shipping (Includes Fees)' },
      // { id: 'delivery', label: 'I qualify for the delivery plan!' }
    ],
    clay,
    bookings,
    cust_aq
  })
}

export async function action({ request }) {
  const formData = await request.formData()
  const userData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    numWheels: formData.get('numWheels'),
    numShared: formData.get('numShared'),
    type: formData.get('type'),
    time: formData.get('time')
  }
  const orderData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    numWheels: formData.get('numWheels'),
    numShared: formData.get('numShared'),
    type: formData.get('type'),
    time: formData.get('time')
  }
  console.log(data)
  return null
}

// this is what i am rendering to the page
export default function BookUrExperience() {
  //get the data from the server
  // useActionData()
  const data = useLoaderData()
  return (
    <div className='mx-auto mt-16 max-w-7xl flex flex-col justify-center'>
      <h1 className='text-2xl'>Book Your Experience!</h1>
      <Form method='POST' className='max-w-3xl'>
        <div className='flex flex-row justify-between p-2'>
          <label className='px-12'>
            First Name <span className='text-red-700'>*</span>
          </label>
          <input
            type='text'
            name='firstName'
            required
            autoFocus
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
            autoFocus
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
            Book Your Class <span className='text-red-700'>*</span>
          </label>
          <select name='type' required className='px-1 rounded p-1 min-w-72'>
            <option value={""}>-- Select Your Class --</option>
            {data.bookings.map(types => (
              <option key={types.id} value={types.id}>
                {types.name} - ${types.price}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-row justify-between p-2'>
          <label className='px-12'>
            Number of Pottery Wheels <span className='text-red-700'>*</span>
          </label>
          <select
            name='numWheels'
            required
            className='px-1 rounded p-1 min-w-72'
          >
            <option value={0}>0 Wheels</option>
            <option value={1}>1 Wheel</option>
            <option value={2}>2 Wheels</option>
            <option value={3}>3 Wheels</option>
            <option value={4}>4 Wheels</option>
            <option value={5}>5 Wheels</option>
            <option value={6}>6 Wheels</option>
            <option value={7}>7 Wheels</option>
            <option value={8}>8 Wheels</option>
            <option value={9}>9 Wheels</option>
            <option value={10}>10 Wheels</option>
          </select>
        </div>

        <div className='flex flex-row justify-between p-2'>
          <label className='px-12'>
            Number of Shared Wheels <span className='text-red-700'>*</span>
          </label>
          <select
            name='numShared'
            required
            className='px-1 rounded p-1 min-w-72'
          >
            <option value={0}>0 Wheels</option>
            <option value={1}>1 Wheel</option>
            <option value={2}>2 Wheels</option>
            <option value={3}>3 Wheels</option>
            <option value={4}>4 Wheels</option>
            <option value={5}>5 Wheels</option>
            <option value={6}>6 Wheels</option>
            <option value={7}>7 Wheels</option>
            <option value={8}>8 Wheels</option>
            <option value={9}>9 Wheels</option>
            <option value={10}>10 Wheels</option>
          </select>
        </div>


        <div className='flex flex-row justify-between p-2'>
          <label className='px-12'>
            Time <span className='text-red-700'>*</span>
          </label>
          <select name='time' required className='px-1 rounded p-1 min-w-72'>
            {data.appointmentTimes.map(time => (
              <option key={time.id} value={time.id}>
                {time.label}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-row justify-between p-2'>
          <label className='px-12'>
            Clay Type <span className='text-red-700'>*</span>
          </label>
          <select name='type' required className='px-1 rounded p-1 min-w-72'>
            <option value={""}>-- Select Your Clay Type --</option>
            {data.clay.map(types => (
              <option key={types.id} value={types.id}>
                {types.name} - ${types.price}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-row justify-between p-2'>
          <label className='px-12'>
            Pottery Pick Up Plan <span className='text-red-700'>*</span>
          </label>
          <select
            name='delivery'
            required
            className='px-1 rounded p-1 min-w-72'
          >
            <option value={""}>-- Select Your Pick Up Plan --</option>

            {data.delivery.map(delivery => (
              <option key={delivery.id} value={delivery.id}>
                {delivery.label}
              </option>
            ))}
          </select>
        </div>

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

        <button
          type='submit'
          className='bg-deep-green rounded px-4 py-2 text-white text-xl hover:bg-hover-green'
        >
          Checkout
        </button>
      </Form>
    </div>
  )
}
