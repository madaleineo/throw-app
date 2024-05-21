import { json, useLoaderData, Form } from '@remix-run/react'
import { db } from '../utils/db.server'

//this is my server
export async function loader () {
  const types = await db.booking_type.findMany()
  const cust_aq = await db.cust_aq.findMany()
  return json({
    appointmentTimes: [
      { id: 'sat', label: 'Saturday at 1:00' },
      { id: 'mon', label: 'Monday at 12:00' },
      { id: 'fri', label: 'Friday at 9:00' },
      { id: 'tue', label: 'Tuesday at 6:00' }
    ],
    delivery: [
      { id: 'pickup', label: 'I will pick up my pottery.' },
      { id: 'shipping', label: 'Please ship my pottery for a fee.' },
      { id: 'delivery', label: 'I qualify for the delivery plan!' }
    ],
    types,
    cust_aq
  })
}

export async function action ({ request }) {
  const formData = await request.formData()
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    partySize: formData.get('partySize'),
    type: formData.get('type'),
    time: formData.get('time')
  }
  console.log(data)
  return null
}

// this is what i am rendering to the page
export default function BookUrExperience () {
  //get the data from the server
  // useActionData()
  const data = useLoaderData()
  return (
    <div className='mx-auto mt-16 max-w-7xl flex flex-col justify-center'>
      <h1 className='text-2xl'>Book Your Experience!</h1>
      <Form method='POST' className='max-w-3xl'>
        <div className='flex flex-row justify-between p-2'>
          <label className='px-12'>
            Name <span className='text-red-700'>*</span>
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
            Party Size <span className='text-red-700'>*</span>
          </label>
          <select
            name='partySize'
            required
            className='px-1 rounded p-1 min-w-72'
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </div>

        <div className='flex flex-row justify-between p-2'>
          <label className='px-12'>
            Booking Type <span className='text-red-700'>*</span>
          </label>
          <select name='type' required className='px-1 rounded p-1 min-w-72'>
            {data.types.map(types => (
              <option key={types.id} value={types.id}>
                {types.name} - ${types.price}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-row justify-between p-2'>
          <label className='px-12'>
            Clay Type <span className='text-red-700'>*</span>
          </label>
          <select name='type' required className='px-1 rounded p-1 min-w-72'>
            {data.types.map(types => (
              <option key={types.id} value={types.id}>
                {types.name} - ${types.price}
              </option>
            ))}
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
            Pottery Pick Up Plan <span className='text-red-700'>*</span>
          </label>
          <select
            name='delivery'
            required
            className='px-1 rounded p-1 min-w-72'
          >
            {data.delivery.map(delivery => (
              <option key={delivery.id} value={delivery.id}>
                {delivery.label}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-row justify-between p-2'>
          <label className='px-12'>
            Street Address <span className='text-red-700'>*</span>
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
