import { json, useLoaderData, Form } from '@remix-run/react'

//this is my server
export function loader () {
  return json({
    appointmentTimes: [
      { id: 'sat', label: 'Saturday at 1:00' },
      { id: 'mon', label: 'Monday at 12:00' },
      { id: 'fri', label: 'Friday at 9:00' },
      { id: 'tue', label: 'Tuesday at 6:00' }
    ]
  })
}

export async function action ({ request }) {
  const formData = await request.formData()
  const data = {
    firstName: formData.get('firstName'),
    lastName: formData.get('firstName'),
    email: formData.get('email'),
    time: formData.get('time')
  }
  console.log(data)
  return null
}

// this is what i am rendering to the page
export default function BookAnAppointment () {
  //get the data from the server
  // useActionData()
  const data = useLoaderData()
  return (
    <div>
      <h1>Book An Appointment</h1>
      <Form method='POST'>
        <div>
          <label>
            First Name
            <input type='text' name='firstName' required></input>
          </label>
        </div>
        <div>
          <label>
            Last Name
            <input type='text' name='lastName' required></input>
          </label>
        </div>
        <div>
          <label>
            Email
            <input type='email' name='email' required></input>
          </label>
        </div>
        <div>
          <label>
            Time
            <select name='time' required>
              {data.appointmentTimes.map(time => (
                <option key={time.id} value={time.id}>
                  {time.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type='submit'>Book Now</button>
      </Form>
    </div>
  )
}
