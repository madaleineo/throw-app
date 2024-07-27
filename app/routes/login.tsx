import { Link } from '@remix-run/react'
import logo from '../images/throw.png'
import React from 'react'


export default function Login() {
  const [error, setError] = React.useState(false)

  return (
    <div className='mx-auto mt-16 max-w-7xl text-center'>
      <form
        onSubmit={e => {
          e.preventDefault()
          setError(false)
          const username = document.getElementById('username').value
          const password = document.getElementById('password').value

        }}
      >
        <div className='align-center'>
          <img src={logo} className='w-60' alt='Throw logo' />
        </div>

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
        {/* <a className='align-right p-2 text-deep-green hover:text-hover-green hover:cursor-pointer'>Forgot Password</a> */}
        <div className='align-left px-2 py-6'>
          <Link to='/pottery' className='sign-in-button-link'>Sign In</Link>
        </div>
        <Link to='/account/new' className='align-center p-2 text-deep-green hover:text-hover-green hover:cursor-pointer' >Create New Account</Link>
      </form>
    </div>
  )
}
