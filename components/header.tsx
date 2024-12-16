import Link from 'next/link'
import { auth } from '@/lib/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,  } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons"
import { faReddit } from '@fortawesome/free-brands-svg-icons';
import { Button } from './buttons/button';
import { LogOutButton } from './buttons/logoutButton';

export const Header = async () => {
  const user = await auth.getUser()
  return (
/*     <header className='w-full flex justify-between items-center px-4 py-4 gap-4 xl:px-20 border'>
      <Link href='/' className='text-2xl font-bold'>
        reddit
      </Link>
      {user ? (
        <div className='flex gap-4'>
          <Link href={'/create'} className='button-primary'>
            Create
          </Link>
        <LogOutButton />
        </div>
      ) : (
        <Link href='/auth/log-in' className='button-primary'>
          Log in
        </Link>
      )}
    </header> */


    <header className='w-full flex justify-between items-center px-4 py-4 gap-4 xl:px-20 border'>
      <Link href='/' className='text-2xl font-bold flex items-center'>
        {<FontAwesomeIcon icon={faReddit} style={{color: "#f53629",}} />}
        <span className='ml-1 hidden md:inline'>reddit</span>
      </Link>
      {user ? (
        <div className='flex md:gap-4 items-center'> 
          <Link href='/create'>
            <Button variant='secondary' className='w-10 h-10 p-0 lg:w-auto lg:h-auto lg:py-2 lg:px-4 scale-75 lg:scale-100 flex items-center justify-center'>
              <FontAwesomeIcon icon={faPlus} />
              <span className='ml-1 hidden lg:inline'>Create</span>
            </Button>
          </Link>
          <LogOutButton />
        </div>
      ) : (
        <Link href='/auth/log-in'>
          <Button className="w-10 h-10 p-0 lg:w-auto lg:h-auto lg:py-2 lg:px-4 scale-75 lg:scale-100 flex items-center justify-center" variant="primary">
            <FontAwesomeIcon icon={faArrowRightToBracket} className="lg:![display:none]" />
            <span className="hidden lg:inline">Log In</span>
          </Button>

        </Link>
      )}
    </header>
  )
}
