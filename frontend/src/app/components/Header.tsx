'use client'

import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
    useUser,
} from '@clerk/nextjs'
import SyncUserToBackend from '../hooks/SyncUserToBackend'

const Header = () => {
    const { user } = useUser()

    return (
        <header className="flex justify-between items-center px-6 py-4 h-16 border-b shadow-sm">
            <div>
                <h1 className='font-poppins font-semibold text-lg'>AI🤖 Task Manager📝</h1>
            </div>
           

            <div className="flex items-center gap-4">
                <h2 className="text-lg  font-poppins">
                    {user ? `Welcome, ${user.firstName} ${user.lastName}` : 'Welcome'}
                </h2>
                <SignedOut>
                    <SignInButton />
                    <SignUpButton>
                        <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                            Sign Up
                        </button>
                    </SignUpButton>
                </SignedOut>

                <SignedIn>
                    <UserButton />
                    <SyncUserToBackend />
                </SignedIn>
            </div>
        </header>
    )
}

export default Header
