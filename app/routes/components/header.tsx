import logo from '../../images/throw.png'

export default function HeaderApp() {
  return (
    <>
      <div className='flex fixed pl-8 py-4 justify-left items-left w-full shadow-sm'>
        <img src={logo} className='logo-small' alt='Throw logo' />
      </div>
    </>
  )
}