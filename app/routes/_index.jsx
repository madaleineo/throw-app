import { Link } from '@remix-run/react'
import logo from '../../public/throw.png'

export const meta = () => {
  return [
    { title: 'Throw Art Studios' },
    { name: 'description', content: 'Welcome to Remix!' }
  ]
}

export default function Index () {
  return (
    <div className='mx-auto mt-16 max-w-7xl text-center'>
      <img src={logo} className='px-52 sm:px-60 md:px-72 lg:px-96' />
      <Link
        to='book-ur-experience'
        className='bg-deep-green rounded px-4 py-2 text-white text-xl hover:bg-hover-green'
      >
        Book Now!
      </Link>
    </div>
  )
}
