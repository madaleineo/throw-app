import { Link } from '@remix-run/react'
import logo from '/throw.png'

export const meta = () => {
  return [
    { title: 'Throw Art Studios' },
    { name: 'description', content: 'Welcome to the best pottery studio in Provo!' }
  ]
}

export default function Index() {
  return (
    <div className='mx-auto mt-16 max-w-7xl text-right'>
      <div>
        <Link
          to='login'
          className='bg-deep-green rounded px-4 py-2 text-white text-xl hover:bg-hover-green'
        >
          Login
        </Link>
      </div>

      <div className='mx-auto mt-16 max-w-7xl text-center'>
        <img src={logo} className='px-52 sm:px-60 md:px-72 lg:px-96' />
        <Link
          to='book-ur-experience'
          className='bg-deep-green rounded px-4 py-2 text-white text-xl hover:bg-hover-green mx-4'
        >
          Book A Class!
        </Link>
        <Link
          to='membership/buy'
          className='bg-deep-green rounded px-4 py-2 text-white text-xl hover:bg-hover-green mx-4'
        >
          Memberships
        </Link>
      </div>
    </div>
  )
}
